import React, { useState, useEffect, useMemo } from 'react';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, isFirebaseConfigured } from './firebase';

import LoginPage from './LoginPage';
import EmailListPage from './EmailListPage';
import DashboardPage from './DashboardPage';
import EmailDetailPage from './EmailDetailPage';
import { emails as initialEmails, Email, Classification, ExtractedData } from './data';

type Page = 'dashboard' | 'inbox';
type Theme = 'light' | 'dark';

export type SortableKeys = keyof Pick<Email, 'from' | 'subject' | 'date' | 'classification'> | 'dataExtracted';

export interface SortConfig {
  key: SortableKeys | null;
  direction: 'ascending' | 'descending';
}

export interface FilterConfig {
  from: string;
  subject: string;
  classification: Classification | 'All';
  dataExtracted: 'All' | 'Yes' | 'Pending' | 'N/A';
}

const FirebaseConfigError: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen bg-red-50 text-red-800 p-4">
    <div className="w-full max-w-2xl text-center bg-white border-2 border-red-300 rounded-lg shadow-xl p-8">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Firebase Configuration Error</h1>
      <p className="text-lg mb-2">
        The application cannot connect to Firebase because it has not been configured correctly.
      </p>
      <p className="text-md mb-6">
        You must replace the placeholder credentials in the <code className="bg-red-100 text-red-900 font-mono p-1 rounded-sm text-sm">src/firebase.ts</code> file with the actual configuration from your Firebase project.
      </p>
      <p className="text-sm text-gray-600">
        Please refer to the comments in that file for detailed instructions on where to find your project's configuration keys. The app will not work until this is resolved.
      </p>
    </div>
  </div>
);

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [activePage, setActivePage] = useState<Page>('dashboard');
  const [emails, setEmails] = useState<Email[]>(initialEmails);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [emailsPerPage, setEmailsPerPage] = useState(10);
  
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'date', direction: 'descending' });
  const [filters, setFilters] = useState<FilterConfig>({
    from: '',
    subject: '',
    classification: 'All',
    dataExtracted: 'All',
  });

  useEffect(() => {
    if (isFirebaseConfigured) {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setAuthLoading(false);
      });
      return () => unsubscribe(); // Cleanup subscription on unmount
    } else {
      setAuthLoading(false);
    }
  }, []);

  // Keep selectedEmail in sync with the main emails list after local state updates
  useEffect(() => {
    if (selectedEmail) {
      const updatedSelectedEmail = emails.find(e => e.id === selectedEmail.id) || null;
      if (JSON.stringify(updatedSelectedEmail) !== JSON.stringify(selectedEmail)) {
          setSelectedEmail(updatedSelectedEmail);
      }
    }
  }, [emails, selectedEmail]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleLogout = () => {
    signOut(auth).catch(error => console.error("Logout error:", error));
  };
  
  const handleSelectEmail = (email: Email) => {
    setSelectedEmail(email);
  };

  const handleBackToInbox = () => {
    setSelectedEmail(null);
  };
  
  const handleNavClick = (page: Page) => {
    setActivePage(page);
    setSelectedEmail(null);
    setCurrentPage(1); // Reset page on navigation
  };

  const handleClassifyEmail = (emailId: string, classification: Classification) => {
    setEmails(prevEmails =>
      prevEmails.map(email =>
        email.id === emailId
          ? { ...email, classification: classification, extractedData: undefined } // Reset extracted data on re-classification
          : email
      )
    );
  };

  const handleExtractData = (emailId: string, data: ExtractedData) => {
    setEmails(prevEmails =>
      prevEmails.map(email =>
        email.id === emailId ? { ...email, extractedData: data } : email
      )
    );
  };

  const handleEmailsPerPageChange = (newSize: number) => {
    setEmailsPerPage(newSize);
    setCurrentPage(1); // Reset to the first page when page size changes
  };

  const handleSort = (key: SortableKeys) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleFilterChange = (filterName: keyof FilterConfig, value: string) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
    setCurrentPage(1); // Reset page when filters change
  };
  
  const processedEmails = useMemo(() => {
    const getExtractionStatus = (email: Email): 'Yes' | 'Pending' | 'N/A' => {
      const isApplicable = ['Booking Creation', 'Booking Amendment', 'Booking Cancellation'].includes(email.classification);
      if (email.extractedData) return 'Yes';
      if (isApplicable) return 'Pending';
      return 'N/A';
    };

    let filteredEmails = [...emails].filter(email => {
      const fromMatch = email.from.toLowerCase().includes(filters.from.toLowerCase());
      const subjectMatch = email.subject.toLowerCase().includes(filters.subject.toLowerCase());
      const classificationMatch = filters.classification === 'All' || email.classification === filters.classification;
      const dataExtractedMatch = filters.dataExtracted === 'All' || getExtractionStatus(email) === filters.dataExtracted;
      return fromMatch && subjectMatch && classificationMatch && dataExtractedMatch;
    });

    if (sortConfig.key) {
      filteredEmails.sort((a, b) => {
        let aValue: string | number;
        let bValue: string | number;

        if (sortConfig.key === 'dataExtracted') {
          const statusOrder = { 'Yes': 2, 'Pending': 1, 'N/A': 0 };
          aValue = statusOrder[getExtractionStatus(a)];
          bValue = statusOrder[getExtractionStatus(b)];
        } else {
          aValue = a[sortConfig.key as Exclude<SortableKeys, 'dataExtracted'>];
          bValue = b[sortConfig.key as Exclude<SortableKeys, 'dataExtracted'>];
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return filteredEmails;
  }, [emails, sortConfig, filters]);


  const renderPage = () => {
    if (selectedEmail) {
      return (
        <EmailDetailPage 
          email={selectedEmail} 
          onBack={handleBackToInbox} 
          onClassify={handleClassifyEmail} 
          onExtractData={handleExtractData}
        />
      );
    }

    switch (activePage) {
      case 'dashboard':
        return <DashboardPage emails={emails} />;
      case 'inbox': {
        const lastEmailIndex = currentPage * emailsPerPage;
        const firstEmailIndex = lastEmailIndex - emailsPerPage;
        const currentEmails = processedEmails.slice(firstEmailIndex, lastEmailIndex);
        const totalPages = Math.ceil(processedEmails.length / emailsPerPage);

        return (
          <EmailListPage 
            emails={currentEmails} 
            onSelectEmail={handleSelectEmail}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalEmails={processedEmails.length}
            emailsPerPage={emailsPerPage}
            onEmailsPerPageChange={handleEmailsPerPageChange}
            sortConfig={sortConfig}
            onSort={handleSort}
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        );
      }
      default:
        return <DashboardPage emails={emails} />;
    }
  };

  const NavButton: React.FC<{ page: Page; label: string }> = ({ page, label }) => (
    <button
      onClick={() => handleNavClick(page)}
      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
        activePage === page
          ? 'bg-white text-blue-600 dark:bg-white dark:text-blue-900 shadow-md'
          : 'text-blue-100 hover:bg-blue-500 dark:text-blue-200 dark:hover:bg-blue-800'
      }`}
      aria-current={activePage === page ? 'page' : undefined}
    >
      {label}
    </button>
  );
  
  if (!isFirebaseConfigured) {
    return <FirebaseConfigError />;
  }

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <svg className="animate-spin h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white font-sans transition-colors duration-300">
      <header className="w-full bg-blue-600 dark:bg-blue-900 border-b border-blue-700 dark:border-blue-800 sticky top-0 z-10 shadow-md">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side: Logo and App Name */}
            <div className="flex items-center space-x-3">
              <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17 20H7C4 20 2 18 2 15V9C2 6 4 4 7 4H17C20 4 22 6 22 9V15C22 18 20 20 17 20Z" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15.5 10.5L14.5 12.5L16.5 13.5L15.5 15.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-xl font-bold text-white">Email Automation Solution</span>
            </div>
            
            {/* Center: Navigation */}
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center space-x-2">
              <NavButton page="dashboard" label="Dashboard" />
              <NavButton page="inbox" label="Inbox" />
            </div>

            {/* Right side: User info, Logout, Theme toggle */}
            <div className="flex items-center space-x-4">
              <div className="text-sm text-blue-100 hidden sm:block truncate" title={user.email || ''}>
                {user.email}
              </div>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-md text-sm font-medium text-blue-100 hover:bg-blue-500 dark:text-blue-200 dark:hover:bg-blue-800 transition-colors duration-200"
                aria-label="Logout"
              >
                Logout
              </button>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-blue-100 dark:text-blue-200 hover:bg-blue-500 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 dark:focus:ring-offset-blue-900 focus:ring-white transition-colors duration-200"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                )}
              </button>
            </div>
          </div>
           {/* Mobile Navigation */}
           <div className="md:hidden flex items-center justify-center space-x-2 pt-2 pb-3">
              <NavButton page="dashboard" label="Dashboard" />
              <NavButton page="inbox" label="Inbox" />
            </div>
        </nav>
      </header>
      <main className="flex-grow flex items-start justify-center p-4 md:p-6">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;
