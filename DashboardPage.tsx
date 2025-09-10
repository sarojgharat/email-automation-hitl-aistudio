import React from 'react';
import { Email, Classification } from './data';

interface DashboardPageProps {
  emails: Email[];
}

const classificationColors: Record<Classification, string> = {
    'booking request': 'bg-green-500',
    'booking amendment': 'bg-yellow-500',
    'booking cancellation': 'bg-red-500',
    'unclassified': 'bg-indigo-500',
    'equipment release request': 'bg-purple-500',
    'special equipment request': 'bg-pink-500',
    'equipment substitution request': 'bg-teal-500',
    'empty container pickup request': 'bg-orange-500',
    'equipment interchange request': 'bg-cyan-500',
    'manual move request': 'bg-lime-500', // Added new classification color
    'other': 'bg-gray-500'
};

// Type guard to narrow the type of classified emails
function isClassifiedEmail(email: Email): email is Email & { classification: Exclude<Classification, 'Unclassified'> } {
    return email.classification !== 'unclassified';
}

const Card: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 ${className}`}>
        {children}
    </div>
);

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <Card>
        <div className="flex items-center">
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg mr-4">
                {icon}
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
            </div>
        </div>
    </Card>
);

const DonutChart: React.FC<{ percentage: number; colorClass: string }> = ({ percentage, colorClass }) => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center w-40 h-40">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                <circle
                    className="text-gray-200 dark:text-gray-700"
                    strokeWidth="10"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="60"
                    cy="60"
                />
                <circle
                    className={colorClass}
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="60"
                    cy="60"
                    style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
                />
            </svg>
            <span className="absolute text-2xl font-bold text-gray-800 dark:text-gray-200">{`${Math.round(percentage)}%`}</span>
        </div>
    );
};

const DashboardPage: React.FC<DashboardPageProps> = ({ emails }) => {
    const totalEmails = emails.length;
    
    // Use type guard for safer type inference
    const classifiedEmails = emails.filter(isClassifiedEmail);
    const unclassifiedCount = totalEmails - classifiedEmails.length;
    const classifiedCount = classifiedEmails.length;
    
    const classificationDistribution = classifiedEmails.reduce((acc, email) => {
        // No type assertion needed here thanks to the type guard
        acc[email.classification] = (acc[email.classification] || 0) + 1;
        return acc;
    }, {} as Record<Exclude<Classification, 'unclassified'>, number>);
    
    const distributionValues = Object.values(classificationDistribution);
    const maxDistributionCount = Math.max(...distributionValues, 0);

    const dailyTrend = emails.reduce((acc, email) => {
        const date = email.date;
        if (!acc[date]) {
            // Initialize all classification types for the date
            acc[date] = Object.keys(classificationColors).reduce((classAcc, classificationKey) => {
                classAcc[classificationKey as Classification] = 0;
                return classAcc;
            }, {} as Record<Classification, number>);
        }
        acc[date][email.classification] = (acc[date][email.classification] || 0) + 1;
        return acc;
    }, {} as Record<string, Record<Classification, number>>);

    const sortedDates = Object.keys(dailyTrend).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
    const dailyTotals = sortedDates.map(date => {
        const counts = Object.values(dailyTrend[date]);
        return counts.reduce((sum, count) => sum + count, 0);
    });
    const maxDailyTotal = Math.max(...dailyTotals, 0);
    
    // Data Extraction Stats
    const relevantEmailsForExtraction = emails.filter(e =>
        ['booking request', 'booking amendment', 'booking cancellation', 'equipment release request', 'special equipment request',
  'equipment substitution request', 'empty container pickup request', 'equipment interchange request', 'manual move request'].includes(e.classification) // Added new classification
    );

    const relevantCount = relevantEmailsForExtraction.length;
    const extractedCount = relevantEmailsForExtraction.filter(e => !!e.extractedData).length;
    const pendingCount = relevantEmailsForExtraction.filter(e => e.extractedData === false).length;
    const extractionPercentage = relevantCount > 0 ? (extractedCount / relevantCount) * 100 : 0;


    return (
        <div className="w-full max-w-7xl mx-auto space-y-6">
            <header>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 mb-1">
                    Dashboard
                </h1>
                <p className="text-gray-500 dark:text-gray-400">An overview of your email classification status.</p>
            </header>
            
            {/* Top Level Stats */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total Emails" value={totalEmails} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>} />
                <StatCard title="Classified" value={classifiedCount} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
                <StatCard title="Unclassified" value={unclassifiedCount} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
            </section>
            
            {/* Classification Summary & Distribution */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-1 flex flex-col items-center justify-center">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Classification Summary</h2>
                    <DonutChart percentage={totalEmails > 0 ? (classifiedCount / totalEmails) * 100 : 0} colorClass="text-blue-500" />
                    <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">{classifiedCount} of {totalEmails} emails classified</p>
                </Card>
                <Card className="lg:col-span-2">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Distribution of Classified Emails</h2>
                    <div className="space-y-4">
                        {(Object.entries(classificationDistribution) as [Exclude<Classification, 'unclassified'>, number][]).map(([classification, count]) => (
                            <div key={classification}>
                                <div className="flex justify-between items-center mb-1 text-sm">
                                    <span className="font-medium text-gray-700 dark:text-gray-300">{classification}</span>
                                    <span className="text-gray-500 dark:text-gray-400">{count}</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                    <div 
                                        className={`${classificationColors[classification]} h-2.5 rounded-full`}
                                        style={{ width: `${maxDistributionCount > 0 ? (count / maxDistributionCount) * 100 : 0}%`, transition: 'width 0.5s ease-in-out' }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </section>
            
            {/* Data Extraction Status */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="flex flex-col items-center justify-center">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Data Extraction Status</h2>
                    <DonutChart percentage={extractionPercentage} colorClass="text-teal-500" />
                    <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">{extractedCount} of {relevantCount} relevant emails extracted</p>
                </Card>
                <Card className="">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Extraction Breakdown</h2>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between items-center mb-1 text-sm">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Data Extracted</span>
                                <span className="text-gray-500 dark:text-gray-400">{extractedCount}</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                <div 
                                    className="bg-green-500 h-2.5 rounded-full"
                                    style={{ width: `${relevantCount > 0 ? (extractedCount / relevantCount) * 100 : 0}%`, transition: 'width 0.5s ease-in-out' }}
                                ></div>
                            </div>
                        </div>
                         <div>
                            <div className="flex justify-between items-center mb-1 text-sm">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Pending Extraction</span>
                                <span className="text-gray-500 dark:text-gray-400">{pendingCount}</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                <div 
                                    className="bg-yellow-500 h-2.5 rounded-full"
                                    style={{ width: `${relevantCount > 0 ? (pendingCount / relevantCount) * 100 : 0}%`, transition: 'width 0.5s ease-in-out' }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </Card>
            </section>

            {/* Daily Trend */}
            <section>
                <Card>
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Day-wise Email Trend</h2>
                    <div className="flex items-end justify-around h-64 space-x-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                        {sortedDates.map((date, i) => {
                            const dailyData = dailyTrend[date];
                            const dailyTotal = dailyTotals[i];
                            return (
                                <div 
                                    key={date} 
                                    className="flex flex-col items-center flex-1 justify-end"
                                    style={{ height: `${maxDailyTotal > 0 ? (dailyTotal / maxDailyTotal) * 100 : 0}%` }} // Set the height of the whole bar relative to maxDailyTotal
                                    title={`Total: ${dailyTotal}`}
                                >
                                    <div className="w-full h-full flex flex-col-reverse items-center rounded-t-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
                                        {(Object.entries(dailyData) as [Classification, number][]).map(([classification, count]) => (
                                            count > 0 && <div
                                                key={classification}
                                                className={`${classificationColors[classification]} w-full`}
                                                style={{ height: `${dailyTotal > 0 ? (count / dailyTotal) * 100 : 0}%`, transition: 'height 0.5s ease-in-out' }} // Set segment height relative to dailyTotal
                                                title={`${classification}: ${count}`}
                                            ></div>
                                        ))}
                                    </div>
                                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">{new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                                </div>
                            );
                        })}
                    </div>
                     <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4">
                        {(Object.entries(classificationColors) as [Classification, string][]).map(([name, color]) => (
                            <div key={name} className="flex items-center text-xs">
                                <span className={`w-3 h-3 rounded-sm mr-1.5 ${color}`}></span>
                                <span className="text-gray-600 dark:text-gray-400">{name}</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </section>
        </div>
    );
};

export default DashboardPage;