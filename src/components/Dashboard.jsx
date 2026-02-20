import React, { useState, useEffect, useMemo, useCallback } from 'react';
import mockData from '../data/mockData.json';
import { filterData, aggregateByCategory, aggregateByRegion, aggregateByDate } from '../utils/dataTransformers';
import LineChart from './charts/LineChart';
import BarChart from './charts/BarChart';
import PieChart from './charts/PieChart';
import CategoryFilter from './filters/CategoryFilter';
import DateRangeFilter from './filters/DateRangeFilter';
import LoadingSpinner from './common/LoadingSpinner';

const Dashboard = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [rawData, setRawData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    // Filter state
    const [filters, setFilters] = useState({
        category: 'All',
        region: 'All',
        startDate: '',
        endDate: ''
    });

    // Extract unique options for filters
    const categories = useMemo(() => [...new Set(rawData.map(item => item.category))], [rawData]);
    const regions = useMemo(() => [...new Set(rawData.map(item => item.region))], [rawData]);

    // Initial load simulation
    useEffect(() => {
        let isMounted = true;

        // Simulate initial network request
        setTimeout(() => {
            if (isMounted) {
                setRawData(mockData);
                setFilteredData(mockData);
                setIsLoading(false);
            }
        }, 800);

        return () => { isMounted = false; };
    }, []);

    // Handle filter changes with simulated delay
    useEffect(() => {
        if (rawData.length === 0) return;

        let isMounted = true;
        setIsLoading(true);
        setError(null);

        // Simulate processing delay for filtering to show loading state
        const timer = setTimeout(() => {
            if (isMounted) {
                const result = filterData(rawData, filters);

                if (result.length === 0) {
                    setError("No data found matching the selected filters.");
                }

                setFilteredData(result);
                setIsLoading(false);
            }
        }, 400);

        return () => {
            clearTimeout(timer);
            isMounted = false;
        };
    }, [filters, rawData]);

    const handleFilterChange = useCallback((key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    }, []);

    // Prepare aggregated data for charts
    const lineChartData = useMemo(() => aggregateByDate(filteredData), [filteredData]);
    const barChartData = useMemo(() => aggregateByRegion(filteredData), [filteredData]);
    const pieChartData = useMemo(() => aggregateByCategory(filteredData), [filteredData]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 md:p-8 font-sans transition-colors duration-200">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header Section */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-gray-200 dark:border-gray-800">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Analytics Overview</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">Interactive data visualization dashboard</p>
                    </div>
                </header>

                {/* Filters Section */}
                <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 xl:p-6 transition-colors duration-200">
                    <div className="flex flex-col flex-wrap sm:flex-row gap-4 xl:gap-6 items-end">
                        <CategoryFilter
                            label="Category"
                            value={filters.category}
                            onChange={(val) => handleFilterChange('category', val)}
                            options={categories}
                        />
                        <CategoryFilter
                            label="Region"
                            value={filters.region}
                            onChange={(val) => handleFilterChange('region', val)}
                            options={regions}
                        />
                        <DateRangeFilter
                            startDate={filters.startDate}
                            endDate={filters.endDate}
                            onStartDateChange={(val) => handleFilterChange('startDate', val)}
                            onEndDateChange={(val) => handleFilterChange('endDate', val)}
                        />

                        <div className="ml-auto w-full sm:w-auto">
                            <button
                                onClick={() => setFilters({ category: 'All', region: 'All', startDate: '', endDate: '' })}
                                className="w-full sm:w-auto px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                aria-label="Reset Filters"
                            >
                                Reset Filters
                            </button>
                        </div>
                    </div>
                </section>

                {/* Content Section */}
                <main className="relative min-h-[400px]">
                    {isLoading && (
                        <div className="absolute inset-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm z-10 flex items-center justify-center rounded-xl">
                            <LoadingSpinner />
                        </div>
                    )}

                    {error && !isLoading ? (
                        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-6 rounded-xl border border-red-100 dark:border-red-800 text-center shadow-sm">
                            <h3 className="text-lg font-semibold mb-2">No Data Available</h3>
                            <p>{error}</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 gap-6">
                            <div className="lg:col-span-2 shadow-sm rounded-xl">
                                <LineChart data={lineChartData} />
                            </div>
                            <div className="shadow-sm rounded-xl">
                                <BarChart data={barChartData} />
                            </div>
                            <div className="shadow-sm rounded-xl">
                                <PieChart data={pieChartData} />
                            </div>
                        </div>
                    )}
                </main>

            </div>
        </div>
    );
};

export default Dashboard;
