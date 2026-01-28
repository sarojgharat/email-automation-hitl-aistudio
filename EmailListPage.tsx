import React from 'react';
import { Email, Classification } from './data';
import { SortConfig, FilterConfig, SortableKeys } from './App';

interface EmailListPageProps {
  emails: Email[];
  onSelectEmail: (email: Email) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalEmails: number;
  emailsPerPage: number;
  onEmailsPerPageChange: (size: number) => void;
  sortConfig: SortConfig;
  onSort: (key: SortableKeys) => void;
  filters: FilterConfig;
  onFilterChange: (filterName: keyof FilterConfig, value: string) => void;
  onRefresh: () => void; // Added onRefresh prop
}

const getClassificationStyles = (classification: Classification): string => {
  switch (classification) {
    case 'booking request':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case 'booking amendment':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    case 'booking cancellation':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    case 'manual move request': // Added new classification style
      return 'bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-300';
    case 'dispute': // Added new classification style
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'; 
    case 'other':
      return 'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-200';
    case 'unclassified':
    default:
      return 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400';
  }
};

const SortableHeader: React.FC<{
  label: string;
  sortKey: SortableKeys;
  sortConfig: SortConfig;
  onSort: (key: SortableKeys) => void;
  className?: string;
}> = ({ label, sortKey, sortConfig, onSort, className }) => (
    <th 
        scope="col" 
        className={`p-4 font-semibold text-gray-600 dark:text-gray-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors duration-200 ${className}`}
        onClick={() => onSort(sortKey)}
        aria-sort={sortConfig.key === sortKey ? (sortConfig.direction === 'ascending' ? 'ascending' : 'descending') : 'none'}
    >
        <div className={`flex items-center ${className?.includes('text-center') ? 'justify-center' : ''}`}>
            {label}
            <span className="ml-2 w-4">
              {sortConfig.key === sortKey && (
                  sortConfig.direction === 'ascending' ? 
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg> : 
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              )}
            </span>
        </div>
    </th>
);

const classificationOptions: (Classification | 'All')[] = [
  'All',
  'booking request',
  'booking amendment',
  'booking cancellation',
  'manual move request', // Added new classification to options
  'dispute',
  'other',
  'unclassified',
];

const dataExtractedOptions: ('All' | 'Yes' | 'Pending' | 'N/A')[] = ['All', 'Yes', 'Pending', 'N/A'];
<<<<<<< HEAD
const automationStatusOptions: ('All' | 'TRIGGERED' | 'PROCESSED' | 'FAILED' | 'NOT_TRIGGERED')[] = ['All', 'TRIGGERED', 'PROCESSED', 'FAILED', 'NOT_TRIGGERED'];
=======
const automationStatusOptions: ('All' | 'TRIGGERED' | 'PROCESSED' | 'FAILED' | 'COMPLETED' | 'NOT_TRIGGERED')[] = ['All', 'TRIGGERED', 'PROCESSED', 'FAILED', 'COMPLETED', 'NOT_TRIGGERED'];
>>>>>>> 42ed698f3f6596aa59d2af4b25ba2cf65107809c


const EmailListPage: React.FC<EmailListPageProps> = ({
  emails,
  onSelectEmail,
  currentPage,
  totalPages,
  onPageChange,
  totalEmails,
  emailsPerPage,
  onEmailsPerPageChange,
  sortConfig,
  onSort,
  filters,
  onFilterChange,
  onRefresh, // Destructure onRefresh
}) => {
  const renderExtractionStatus = (email: Email) => {
    const isApplicable = ['unclassified', 'booking request', 'booking amendment', 'booking cancellation', 'manual move request', 'dispute'].includes(email.classification); // Added new classification

    if (email.extractedData) {
        return (
            <div className="flex justify-center items-center" title="Data Extracted">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" viewBox="0 0 20 20" fill="currentColor" aria-label="Data extracted">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
            </div>
        );
    }
    
    if (isApplicable) {
        return (
            <div className="flex justify-center items-center" title="Data Not Extracted">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-label="Data not extracted">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center" title="Not Applicable">
           <span className="text-gray-400 dark:text-gray-500 font-semibold">-</span>
        </div>
    );
  };

  const renderAutomationStatus = (status: string) => {
<<<<<<< HEAD
    if (status === 'PROCESSED') {
=======
    if (status === 'COMPLETED') {
      return (
        <div className="flex justify-center items-center" title="Completed">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      );
    } else if (status === 'PROCESSED') {
>>>>>>> 42ed698f3f6596aa59d2af4b25ba2cf65107809c
      return (
        <div className="flex justify-center items-center" title="Processed">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      );
    } else if (status === 'FAILED') {
      return (
        <div className="flex justify-center items-center" title="Failed">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      );
    } else if (!status || status === 'NOT_TRIGGERED') {
      return (
        <div className="flex justify-center items-center" title="Not Triggered">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      );
    } else {
      return (
        <div className="flex justify-center items-center" title="Triggered">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      );
    }
  };
  
  return (
    <div className="w-full max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-500">
            Inbox
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Showing {totalEmails} messages.</p>
        </div>
        <button
          onClick={onRefresh}
          className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
          aria-label="Refresh emails"
        >
          Refresh
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left table-fixed">
          <colgroup>
            <col className="w-[20%]" />
            <col className="w-[35%]" />
            <col className="w-[15%]" />
            <col className="w-[20%]" />
            <col className="w-[10%]" />
             <col className="w-[15%]" />
          </colgroup>
          <thead className="bg-gray-50 dark:bg-gray-900/50">
            <tr>
              <SortableHeader label="From" sortKey="from" sortConfig={sortConfig} onSort={onSort} />
              <SortableHeader label="Subject" sortKey="subject" sortConfig={sortConfig} onSort={onSort} />
              <SortableHeader label="Date" sortKey="date" sortConfig={sortConfig} onSort={onSort} />
              <SortableHeader label="Classification" sortKey="classification" sortConfig={sortConfig} onSort={onSort} />
              <SortableHeader label="Data Extracted" sortKey="dataExtracted" sortConfig={sortConfig} onSort={onSort} className="text-center" />
               <SortableHeader label="Automation Status" sortKey="automationStatus" sortConfig={sortConfig} onSort={onSort} />
            </tr>
             <tr className="bg-gray-50 dark:bg-gray-900/50 border-t border-b border-gray-200 dark:border-gray-700">
              <td className="p-2">
                <input 
                  type="text" 
                  placeholder="Filter from..." 
                  value={filters.from}
                  onChange={(e) => onFilterChange('from', e.target.value)}
                  className="w-full px-2 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm" 
                  aria-label="Filter by From"
                />
              </td>
              <td className="p-2">
                <input 
                  type="text" 
                  placeholder="Filter subject..." 
                  value={filters.subject}
                  onChange={(e) => onFilterChange('subject', e.target.value)}
                  className="w-full px-2 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  aria-label="Filter by Subject"
                />
              </td>
              <td className="p-2">
                 {/* Date filter intentionally left blank */}
              </td>
              <td className="p-2">
                <select
                  value={filters.classification}
                  onChange={(e) => onFilterChange('classification', e.target.value)}
                  className="w-full px-2 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  aria-label="Filter by Classification"
                >
                  {classificationOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </td>
              <td className="p-2">
                <select
                  value={filters.dataExtracted}
                  onChange={(e) => onFilterChange('dataExtracted', e.target.value)}
                  className="w-full px-2 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  aria-label="Filter by Data Extracted"
                >
                  {dataExtractedOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </td>
               <td className="p-2">
                <select
                  value={filters.automationStatus}
                  onChange={(e) => onFilterChange('automationStatus', e.target.value)}
                  className="w-full px-2 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  aria-label="Filter by Automation Status"
                >
                  {automationStatusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </td>
            </tr>
          </thead>
          <tbody>
            {emails.map((email) => (
              <tr 
                key={email.id}
                onClick={() => onSelectEmail(email)}
                className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors duration-200 cursor-pointer"
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && onSelectEmail(email)}
              >
                <td className="p-4 font-medium text-gray-800 dark:text-gray-200 truncate" title={email.from}>{email.from}</td>
                <td className="p-4 text-gray-600 dark:text-gray-300 truncate" title={email.subject}>{email.subject}</td>
                <td className="p-4 text-gray-500 dark:text-gray-400">{email.date}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 text-xs font-semibold leading-tight rounded-full ${getClassificationStyles(email.classification)}`}>
                    {email.classification}
                  </span>
                </td>
                <td className="p-4">
                    {renderExtractionStatus(email)}
                </td>
                 <td className="p-4">
                    {renderAutomationStatus(email.automationStatus)}
                </td>
              </tr>
            ))}
             {emails.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center p-8 text-gray-500 dark:text-gray-400">
                  No emails match your search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between flex-wrap gap-y-4">
          <div>
              <p className="text-sm text-gray-700 dark:text-gray-400">
                  Showing{' '}
                  <span className="font-medium">{Math.min((currentPage - 1) * emailsPerPage + 1, totalEmails)}</span>
                  {' '}to{' '}
                  <span className="font-medium">{Math.min(currentPage * emailsPerPage, totalEmails)}</span>
                  {' '}of{' '}
                  <span className="font-medium">{totalEmails}</span>
                  {' '}results
              </p>
          </div>
          <div className="flex items-center gap-x-6 gap-y-2 flex-wrap justify-end">
              <div className="flex items-center gap-2">
                <label htmlFor="emails-per-page" className="text-sm font-medium text-gray-700 dark:text-gray-400">Rows per page:</label>
                <select
                    id="emails-per-page"
                    value={emailsPerPage}
                    onChange={(e) => onEmailsPerPageChange(Number(e.target.value))}
                    className="py-1.5 pl-2 pr-7 border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
                    aria-label="Select number of emails per page"
                >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                  <button
                      onClick={() => onPageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                      aria-label="Go to previous page"
                  >
                      Previous
                  </button>
                  <span className="text-sm text-gray-700 dark:text-gray-400" aria-live="polite">
                      Page {currentPage} of {totalPages}
                  </span>
                  <button
                      onClick={() => onPageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                      aria-label="Go to next page"
                  >
                      Next
                  </button>
              </div>
          </div>
      </div>
    </div>
  );
};

export default EmailListPage;