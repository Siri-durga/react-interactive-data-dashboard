import { describe, it, expect } from 'vitest';
import { filterData, aggregateByCategory, aggregateByRegion } from './dataTransformers';

describe('dataTransformers', () => {
    const sampleData = [
        { id: '1', date: '2023-01-01', category: 'A', region: 'North', value: 10 },
        { id: '2', date: '2023-01-15', category: 'B', region: 'South', value: 20 },
        { id: '3', date: '2023-02-01', category: 'A', region: 'East', value: 30 },
    ];

    describe('filterData', () => {
        it('returns all data when filters are default', () => {
            const filters = { category: 'All', region: 'All', startDate: '', endDate: '' };
            expect(filterData(sampleData, filters)).toHaveLength(3);
        });

        it('filters by category correctly', () => {
            const filters = { category: 'A', region: 'All', startDate: '', endDate: '' };
            const result = filterData(sampleData, filters);
            expect(result).toHaveLength(2);
            expect(result.every(item => item.category === 'A')).toBe(true);
        });

        it('filters by region correctly', () => {
            const filters = { category: 'All', region: 'South', startDate: '', endDate: '' };
            const result = filterData(sampleData, filters);
            expect(result).toHaveLength(1);
            expect(result[0].region).toBe('South');
        });

        it('filters by date range correctly', () => {
            const filters = { category: 'All', region: 'All', startDate: '2023-01-01', endDate: '2023-01-31' };
            const result = filterData(sampleData, filters);
            expect(result).toHaveLength(2);
            expect(result.every(item => item.date.startsWith('2023-01'))).toBe(true);
        });

        it('handles empty data gracefully', () => {
            const filters = { category: 'A', region: 'All', startDate: '', endDate: '' };
            expect(filterData([], filters)).toEqual([]);
            expect(filterData(undefined, filters)).toEqual([]);
        });
    });

    describe('aggregations', () => {
        it('aggregates by category correctly', () => {
            const result = aggregateByCategory(sampleData);
            expect(result).toHaveLength(2);
            const categoryA = result.find(r => r.category === 'A');
            expect(categoryA.value).toBe(40); // 10 + 30
        });

        it('aggregates by region correctly', () => {
            const result = aggregateByRegion(sampleData);
            expect(result).toHaveLength(3);
        });
    });
});
