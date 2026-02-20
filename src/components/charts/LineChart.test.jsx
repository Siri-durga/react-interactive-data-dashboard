import React from 'react';
import { render, screen } from '@testing-library/react';
import LineChart from './LineChart';

// Mock Recharts to avoid complicated DOM/canvas rendering issues in tests
vi.mock('recharts', async () => {
    const OriginalRecharts = await vi.importActual('recharts');

    return {
        ...OriginalRecharts,
        ResponsiveContainer: ({ children }) => <div data-testid="responsive-container">{children}</div>,
        LineItem: () => <div data-testid="line" />,
        LineChart: ({ children }) => <div data-testid="line-chart">{children}</div>
    };
});

describe('LineChart Component', () => {
    it('renders "No data available" message when data is empty', () => {
        render(<LineChart data={[]} />);
        expect(screen.getByText('No data available for Line Chart')).toBeInTheDocument();
    });

    it('renders chart title when data is provided', () => {
        const mockData = [{ date: '2023-01', value: 100 }];
        render(<LineChart data={mockData} />);
        expect(screen.getByText('Value Trend Over Time')).toBeInTheDocument();
    });

    it('renders the responsive container wrapping the chart', () => {
        const mockData = [{ date: '2023-01', value: 100 }];
        render(<LineChart data={mockData} />);
        expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
    });
});
