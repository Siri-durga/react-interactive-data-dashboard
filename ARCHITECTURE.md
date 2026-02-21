# Architecture Document

## Overview
The Interactive Data Visualization Dashboard follows a component-based architecture built with React and Vite. The application is designed to be modular, scalable, and responsive, with a clear separation of concerns between state management, data transformation, and UI rendering.

## Component Hierarchy
```
Dashboard (Container Component - Manages state and data fetching)
├── Headings / Overview Text
├── Filters Section
│   ├── CategoryFilter (Presentational)
│   ├── RegionFilter (Presentational)
│   └── DateRangeFilter (Presentational)
└── Charts Section (Grid Layout)
    ├── LineChart (Presentational - Recharts)
    ├── BarChart (Presentational - Recharts)
    └── PieChart (Presentational - Recharts)
```

## Data Flow
1. **Initial Load**: `Dashboard` component loads `mockData.json` into `rawData` state.
2. **Filtering**: When a user interacts with a filter component (`CategoryFilter`, `DateRangeFilter`), it triggers a callback (`handleFilterChange`) that updates the `filters` state in `Dashboard`.
3. **Data Transformation**: 
   - A `useEffect` hook in `Dashboard` listens to changes in `filters`.
   - It calls `filterData` from `src/utils/dataTransformers.js` to process `rawData` and generate `filteredData`. 
   - A simulated network delay (200ms) provides feedback via a loading spinner.
4. **Aggregation**: `useMemo` hooks in `Dashboard` take `filteredData` and prepare aggregated datasets (`lineChartData`, `barChartData`, `pieChartData`) using specific transformers (`aggregateByCategory`, `aggregateByRegion`, etc.).
5. **Rendering**: The structured data is passed as props to the presentational chart components, which use `Recharts` to update the visualizations dynamically.

## Design Decisions
- **State Management**: Used React's built-in `useState`, `useMemo`, `useCallback`, and `useEffect`. A global state store (like Redux) was deemed unnecessary because the state primarily consists of filter configurations and derived data localized within the main dashboard.
- **Separation of Concerns**: Data transformation logic (filtering and aggregation) is completely decoupled from React components into pure functions inside `utils/dataTransformers.js`. This allows for straightforward unit testing without requiring complete DOM rendering.
- **Styling**: Used Tailwind CSS for utility-first styling. This accelerated the development of a fully responsive grid system and ensured rapid prototyping.
- **Accessibility (a11y)**: Added semantic elements (e.g., `<header>`, `<main>`, `<section>`), appropriate ARIA labels on inputs/buttons, and ensured full keyboard navigability.
