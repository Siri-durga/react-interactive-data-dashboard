export const filterData = (data, filters) => {
    if (!data) return [];

    let filtered = [...data];

    if (filters.category && filters.category !== "All") {
        filtered = filtered.filter((item) => item.category === filters.category);
    }

    if (filters.region && filters.region !== "All") {
        filtered = filtered.filter((item) => item.region === filters.region);
    }

    if (filters.startDate && filters.endDate) {
        filtered = filtered.filter((item) => {
            const itemDate = new Date(item.date);
            const start = new Date(filters.startDate);
            const end = new Date(filters.endDate);
            return itemDate >= start && itemDate <= end;
        });
    }

    return filtered;
};

export const aggregateByCategory = (data) => {
    const result = data.reduce((acc, item) => {
        if (!acc[item.category]) {
            acc[item.category] = { category: item.category, value: 0 };
        }
        acc[item.category].value += item.value;
        return acc;
    }, {});
    return Object.values(result);
};

export const aggregateByRegion = (data) => {
    const result = data.reduce((acc, item) => {
        if (!acc[item.region]) {
            acc[item.region] = { region: item.region, value: 0 };
        }
        acc[item.region].value += item.value;
        return acc;
    }, {});
    return Object.values(result);
};

export const aggregateByDate = (data) => {
    const result = data.reduce((acc, item) => {
        // Grouping by month for smoother line charts, or leave as date
        const month = item.date.substring(0, 7); // Format: YYYY-MM
        if (!acc[month]) {
            acc[month] = { date: month, value: 0 };
        }
        acc[month].value += item.value;
        return acc;
    }, {});

    return Object.values(result).sort((a, b) => a.date.localeCompare(b.date));
};
