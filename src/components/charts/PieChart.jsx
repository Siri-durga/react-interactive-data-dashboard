import React from 'react';
import {
    PieChart as RechartsPieChart,
    Pie,
    Tooltip,
    Cell,
    ResponsiveContainer,
    Legend
} from 'recharts';

const COLORS = ['#8b5cf6', '#ec4899', '#f59e0b', '#3b82f6'];

const PieChart = ({ data }) => {
    if (!data || data.length === 0) {
        return <div className="flex justify-center items-center h-full text-gray-500">No data available for Pie Chart</div>;
    }

    return (
        <div className="w-full h-80 bg-white p-4 rounded-xl shadow-md border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">Distribution by Category</h3>
            <ResponsiveContainer width="100%" height="85%">
                <RechartsPieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                        nameKey="category"
                        stroke="none"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
                        itemStyle={{ color: '#1f2937' }}
                    />
                    <Legend iconType="circle" layout="vertical" verticalAlign="middle" align="right" />
                </RechartsPieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PieChart;
