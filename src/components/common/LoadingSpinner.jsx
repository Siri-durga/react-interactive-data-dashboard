import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="flex flex-col items-center justify-center p-12 w-full h-full min-h-[400px]">
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300 font-medium">Loading data...</p>
        </div>
    );
};

export default LoadingSpinner;
