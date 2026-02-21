# Interactive Data Visualization Dashboard

This project is a responsive, interactive data visualization dashboard built with React, Vite, Recharts, and Tailwind CSS. It demonstrates modern frontend architecture, state management, and accessible accessible design.

## Features

- **Interactive Charts**: Displays three distinct visualizations (Line Chart, Bar Chart, Pie Chart) rendered using Recharts.
- **Dynamic Filtering**: Allows users to filter data by Category, Region, and Date Range. Charts update automatically based on filter selections.
- **Responsive Layout**: Designed to work seamlessly across mobile, tablet, and desktop devices.
- **Accessibility**: Built with semantic HTML, features ARIA labels, and supports full keyboard navigation.
- **Error Handling & Loading States**: Simulates network delays with loading spinners and gracefully handles empty or invalid filter results.

## Technologies Used

- **React 18**: Frontend library for building the user interface.
- **Vite**: Next-generation frontend tooling for rapid development and building.
- **Recharts**: Composable charting library built on React components.
- **Tailwind CSS v4**: Utility-first CSS framework for rapid UI development.
- **Vitest & React Testing Library**: For unit and component testing.
- **Docker**: For containerization and easy deployment.

## Data Schema

The dashboard uses a static JSON dataset containing objects with the following structure:
```json
{
  "id": "1",
  "date": "2023-01-01",
  "category": "Electronics",
  "value": 120,
  "region": "North"
}
```
- `id`: Unique identifier (String)
- `date`: Date of the record in YYYY-MM-DD format (String)
- `category`: Product category (String)
- `value`: Numerical value for charts (Number)
- `region`: Geographical region (String)

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd my-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

### Running Tests
To run the automated test suite using Vitest:
```bash
npm run test
```

## Docker Setup

To run the application using Docker Compose:
1. Ensure Docker Desktop is running.
2. Build and start the container:
   ```bash
   docker-compose up --build -d
   ```
3. The dashboard will be accessible at `http://localhost:8080`.
4. To stop the container:
   ```bash
   docker-compose down
   ```

## Architectural Decisions

- **Component Structure**: Followed a modular approach separating pure presentational components (`LineChart`, `CategoryFilter`) from stateful containers (`Dashboard`).
- **State Management**: Opted for generic React hooks (`useState`, `useMemo`, `useCallback`, `useEffect`) rather than global stores like Redux, as the complexity of state (sharing simple filters to compute derived data) did not warrant external dependencies.
- **Data Transformation**: Extracted complex data manipulation logic into `src/utils/dataTransformers.js`. This enforces separation of concerns and facilitates independent unit testing without rendering UI components.
- **Styling**: Leveraged Tailwind CSS for rapid styling, ensuring responsive breakpoints and creating a consistent dark/light mode adaptable interface.

## Contact
DURGA LALITHA SRI VARSHITHA-23A91A0516
