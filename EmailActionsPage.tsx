import React, { useState } from 'react';
import { Card } from './DashboardPage'; // Assuming Card is exported from DashboardPage

type BusinessProcess = 'booking' | 'equipment' | 'invoicing';

interface EmailActionsPageProps {
  onActionComplete: () => void; // Callback to refresh data or page
}

const EmailActionsPage: React.FC<EmailActionsPageProps> = ({ onActionComplete }) => {
    const [selectedBusinessProcess, setSelectedBusinessProcess] = useState<BusinessProcess>('booking');

    const handleIngestEmails = async () => {
        console.log(`Ingesting emails for business process: ${selectedBusinessProcess}`);
        try {
            const response = await fetch('https://email-ingestor-service-165559087544.europe-west1.run.app/process-emails', {
                
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    business_process: selectedBusinessProcess,
                    max_emails: 10,
                    background: true,
                }),
            });

            if (response.ok) {
                const result = await response.json();
                alert(`Email ingestion for ${selectedBusinessProcess} triggered successfully!`);
                console.log('Ingestion API response:', result);
                onActionComplete(); // Refresh after successful ingestion
            } else {
                const errorData = await response.json();
                alert(`Failed to trigger email ingestion: ${errorData.detail || response.statusText}`);
                console.error('Ingestion API error:', errorData);
            }
        } catch (error) {
            alert('An unexpected error occurred during email ingestion.');
            console.error('Error ingesting emails:', error);
        }
    };

    const handleProcessEmails = async () => {
        console.log('Processing emails');
        try {
            const response = await fetch('https://email-processor-service-165559087544.europe-west1.run.app/process-emails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    background: true,
                }),
            });

            if (response.ok) {
                const result = await response.json();
                alert(`Email processing for ${selectedBusinessProcess} triggered successfully!`);
                console.log('Processing API response:', result);
                onActionComplete(); // Refresh after successful processing
            } else {
                const errorData = await response.json();
                alert(`Failed to trigger email processing: ${errorData.detail || response.statusText}`);
                console.error('Processing API error:', errorData);
            }
        } catch (error) {
            alert('An unexpected error occurred during email processing.');
            console.error('Error processing emails:', error);
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto space-y-6">
            <header>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 mb-1">
                    Email Actions
                </h1>
                <p className="text-gray-500 dark:text-gray-400">Manage email ingestion and processing workflows.</p>
            </header>

            <section>
                <Card>
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Ingest Emails</h2>
                    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <button
                            onClick={handleIngestEmails}
                            className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-700 dark:hover:bg-blue-800"
                        >
                            Ingest Emails
                        </button>
                        <select
                            value={selectedBusinessProcess}
                            onChange={(e) => setSelectedBusinessProcess(e.target.value as BusinessProcess)}
                            className="block w-full sm:w-auto px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="booking">Booking</option>
                            <option value="equipment">Equipment</option>
                            <option value="invoicing">Invoicing</option>
                        </select>
                    </div>
                </Card>
            </section>

            <section>
                <Card>
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Process Emails</h2>
                    <button
                        onClick={handleProcessEmails}
                        className="px-5 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:bg-purple-700 dark:hover:bg-purple-800"
                    >
                        Process Emails
                    </button>
                </Card>
            </section>
        </div>
    );
};

export default EmailActionsPage;
