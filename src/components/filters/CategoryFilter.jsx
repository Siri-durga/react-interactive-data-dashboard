import React from 'react';

const CategoryFilter = ({ value, onChange, options, label }) => {
    return (
        <div className="flex flex-col gap-1 w-full sm:w-auto">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
            </label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                aria-label={`Filter by ${label}`}
            >
                <option value="All">All {label}</option>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CategoryFilter;
