import React, { useState, useEffect } from 'react';
import { Email, Classification, ExtractedData } from './data';

interface EmailDetailPageProps {
  email: Email;
  onBack: () => void;
  onClassify: (emailId: string, classification: Classification) => void;
  onExtractData: (emailId: string, data: ExtractedData) => void;
}

const classificationOptions: Classification[] = [
  'Booking Creation',
  'Booking Amendment',
  'Booking Cancellation',
  'Not related',
];

const ClassificationButton: React.FC<{
  onClick: () => void;
  colorClasses: string;
  children: React.ReactNode;
}> = ({ onClick, colorClasses, children }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-transform transform hover:scale-105 ${colorClasses}`}
  >
    {children}
  </button>
);

const FormField: React.FC<{ 
  name: string; 
  label: string; 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; 
  type?: string; 
  required?: boolean;
  rows?: number;
}> = ({ name, label, value, onChange, type = 'text', required = false, rows }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{label}</label>
        {type === 'textarea' ? (
          <textarea
            id={name}
            name={name}
            value={value || ''}
            onChange={onChange}
            required={required}
            rows={rows || 3}
            className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900 dark:text-white"
          />
        ) : (
          <input
            type={type}
            id={name}
            name={name}
            value={value || ''}
            onChange={onChange}
            required={required}
            className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900 dark:text-white"
          />
        )}
    </div>
);


const EmailDetailPage: React.FC<EmailDetailPageProps> = ({ email, onBack, onClassify, onExtractData }) => {
  const [isClassifying, setIsClassifying] = useState(email.classification === 'Unclassified');
  const [formData, setFormData] = useState<Partial<ExtractedData>>({});

  useEffect(() => {
    if (email.extractedData) {
        setFormData(email.extractedData);
    } else {
        // Initialize form with empty strings based on classification
        switch (email.classification) {
            case 'Booking Creation':
                setFormData({ type: 'Booking Creation', origin: '', destination: '', fromDate: '', toDate: '', specialRequests: '' });
                break;
            case 'Booking Amendment':
                setFormData({ type: 'Booking Amendment', bookingNumber: '', updatedDetails: '' });
                break;
            case 'Booking Cancellation':
                setFormData({ type: 'Booking Cancellation', bookingNumber: '', cancellationReason: '', dateOfChange: '' });
                break;
            default:
                setFormData({});
        }
    }
  }, [email.classification, email.extractedData]);


  const handleClassify = (classification: Classification) => {
    onClassify(email.id, classification);
    setIsClassifying(false);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveData = (e: React.FormEvent) => {
      e.preventDefault();
      if (email.classification !== 'Unclassified' && email.classification !== 'Not related') {
          const dataToSave = {
              ...formData,
              type: email.classification,
          } as ExtractedData;
          onExtractData(email.id, dataToSave);
      }
  };

  const showExtractionSection = email.classification !== 'Unclassified' && email.classification !== 'Not related';

  return (
    <div className="w-full max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white truncate" title={email.subject}>
            {email.subject}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            From: <span className="font-medium text-gray-700 dark:text-gray-200">{email.from}</span>
          </p>
           <p className="text-sm text-gray-500 dark:text-gray-400">
            Date: <span className="font-medium text-gray-700 dark:text-gray-200">{email.date}</span>
          </p>
        </div>
        <button
          onClick={onBack}
          className="flex-shrink-0 px-4 py-2 rounded-md text-sm font-medium bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 transition-colors duration-200 flex items-center"
          aria-label="Back to Inbox"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back
        </button>
      </div>

      {/* Main content area */}
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 lg:gap-x-8">
        
        {/* Left Panel: Email Content */}
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 sr-only lg:not-sr-only">Email Content</h2>
          <div className="text-gray-700 dark:text-gray-300">
              <p className="whitespace-pre-wrap font-serif leading-relaxed">{email.body}</p>
          </div>
        </div>

        {/* Right Panel: Actions */}
        <div className="p-6 lg:border-l border-gray-200 dark:border-gray-700 space-y-8 bg-gray-50 dark:bg-gray-900/50 lg:bg-transparent lg:dark:bg-transparent">
          
          {/* Classification Section */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Classification</h2>
            {isClassifying ? (
              <div className="flex flex-wrap gap-3 items-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">Select a category:</p>
                {classificationOptions.map(option => (
                   <ClassificationButton
                     key={option}
                     onClick={() => handleClassify(option)}
                     colorClasses="bg-blue-500 hover:bg-blue-600 text-white"
                   >
                     {option}
                   </ClassificationButton>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <p className="text-gray-700 dark:text-gray-300">
                  Current: <span className="font-bold px-2 py-1 bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 rounded-md text-sm">{email.classification}</span>
                </p>
                <button
                  onClick={() => setIsClassifying(true)}
                  className="px-4 py-2 rounded-md text-sm font-medium bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 transition-colors duration-200"
                >
                  Re-Classify
                </button>
              </div>
            )}
          </div>

          {/* Data Extraction Section */}
          {showExtractionSection && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  {email.extractedData ? 'Update Data' : 'Extract Data'}
              </h2>
              <form onSubmit={handleSaveData} className="space-y-4">
                  {email.classification === 'Booking Creation' && 'origin' in formData && (
                      <>
                          <FormField name="origin" label="Origin" value={(formData as any).origin} onChange={handleInputChange} required />
                          <FormField name="destination" label="Destination" value={(formData as any).destination} onChange={handleInputChange} required />
                          <FormField name="fromDate" label="From Date" type="date" value={(formData as any).fromDate} onChange={handleInputChange} required />
                          <FormField name="toDate" label="To Date" type="date" value={(formData as any).toDate} onChange={handleInputChange} required />
                          <FormField name="specialRequests" label="Special Requests" type="textarea" value={(formData as any).specialRequests} onChange={handleInputChange} />
                      </>
                  )}
                  {email.classification === 'Booking Amendment' && 'bookingNumber' in formData && (
                       <>
                          <FormField name="bookingNumber" label="Booking Number" value={(formData as any).bookingNumber} onChange={handleInputChange} required />
                          <FormField name="updatedDetails" label="Updated Details" type="textarea" value={(formData as any).updatedDetails} onChange={handleInputChange} required />
                       </>
                  )}
                  {email.classification === 'Booking Cancellation' && 'bookingNumber' in formData && (
                      <>
                          <FormField name="bookingNumber" label="Booking Number" value={(formData as any).bookingNumber} onChange={handleInputChange} required />
                          <FormField name="cancellationReason" label="Cancellation Reason" type="textarea" value={(formData as any).cancellationReason} onChange={handleInputChange} />
                          <FormField name="dateOfChange" label="Date of Change" type="date" value={(formData as any).dateOfChange} onChange={handleInputChange} />
                      </>
                  )}
                  <div className="flex justify-end">
                      <button
                          type="submit"
                          className="px-4 py-2 rounded-md text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200"
                      >
                          {email.extractedData ? 'Update Data' : 'Save Data'}
                      </button>
                  </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailDetailPage;