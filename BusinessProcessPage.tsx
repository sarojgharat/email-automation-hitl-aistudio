
import React, { useState } from 'react';

export interface BusinessProcess {
  id: string;
  name: string;
  classificationCategories: string[];
  extractionSchema: string; // Storing as a string for simplicity
}

interface BusinessProcessPageProps {
  businessProcesses: BusinessProcess[];
  onAddBusinessProcess: (process: BusinessProcess) => void;
}

const BusinessProcessPage: React.FC<BusinessProcessPageProps> = ({ businessProcesses, onAddBusinessProcess }) => {
  const [newProcessName, setNewProcessName] = useState('');
  const [newCategories, setNewCategories] = useState('');
  const [newSchema, setNewSchema] = useState('');

  const handleAddProcess = () => {
    if (newProcessName.trim() === '') return;

    const newProcess: BusinessProcess = {
      id: `bp-${Date.now()}`,
      name: newProcessName,
      classificationCategories: newCategories.split(',').map(c => c.trim()),
      extractionSchema: newSchema,
    };

    onAddBusinessProcess(newProcess);
    setNewProcessName('');
    setNewCategories('');
    setNewSchema('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Business Process Onboarding</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form to add a new business process */}
        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Add New Process</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Business Process Name"
              value={newProcessName}
              onChange={(e) => setNewProcessName(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Classification Categories (comma-separated)"
              value={newCategories}
              onChange={(e) => setNewCategories(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
            <textarea
              placeholder="Data Extraction JSON Schema"
              value={newSchema}
              onChange={(e) => setNewSchema(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              rows={6}
            />
            <button
              onClick={handleAddProcess}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Add Process
            </button>
          </div>
        </div>

        {/* List of existing business processes */}
        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Existing Processes</h2>
          <div className="space-y-4">
            {businessProcesses.length > 0 ? (
              businessProcesses.map(process => (
                <div key={process.id} className="p-4 bg-white dark:bg-gray-600 rounded-md shadow-sm">
                  <h3 className="font-bold text-lg">{process.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Categories: {process.classificationCategories.join(', ')}
                  </p>
                  <details className="mt-2">
                    <summary className="cursor-pointer text-sm text-blue-500 hover:underline">View Schema</summary>
                    <pre className="mt-2 p-2 bg-gray-100 dark:bg-gray-500 rounded-md text-sm overflow-auto">
                      <code>{process.extractionSchema}</code>
                    </pre>
                  </details>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No business processes defined yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessProcessPage;
