import React from 'react';

const DateRangeFilter = ({ startDate, endDate, onStartDateChange, onEndDateChange }) => {
    return (
        <div className="flex flex-col gap-1 w-full sm:w-auto">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Date Range
            </label>
            <div className="flex items-center gap-2">
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => onStartDateChange(e.target.value)}
                    className="px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    aria-label="Start Date"
                />
                <span className="text-gray-500">-</span>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => onEndDateChange(e.target.value)}
                    className="px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    aria-label="End Date"
                />
            </div>
        </div>
    );
};

export default DateRangeFilter;
