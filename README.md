# Petroleum Data Dashboard

A modern, responsive web application for visualizing and analyzing petroleum price data across Nigerian states. Built with React, TypeScript, and Tailwind CSS.2

# Project url

https://petrodataa.vercel.app/

## 🎯 Project Overview

This dashboard provides real-time petroleum price analysis with interactive charts, searchable tables, and comprehensive reporting features. It's designed to help stakeholders track fuel prices, analyze trends, and make data-driven decisions in the petroleum industry.

## ✨ Features

- **Interactive Dashboard**: Real-time price visualization with customizable charts
- **Search & Filter**: Advanced search functionality with region and fuel type filters
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark Theme**: Modern black theme with consistent styling across components
- **Data Visualization**: Area charts, line charts, and mini-charts for trend analysis
- **Export Functionality**: Download reports and share data insights
- **Collapsible Sidebar**: Space-efficient navigation with intuitive controls

## 🛠️ Technical Stack

- **Frontend**: React 18+ with TypeScript
- **Styling**: Tailwind CSS for responsive design
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React for consistent iconography
- **Build Tool**: Vite for fast development and building
- **Code Quality**: ESLint with TypeScript rules


## 🎨 Design System

### Color Palette
- **Primary**: Orange gradient (`from-orange-500 to-orange-600`)
- **Background**: Dark theme with `bg-black/30` containers
- **Text**: White/gray variants for optimal contrast
- **Accents**: Green for positive trends, Orange for negative trends

### Typography
- **Headers**: Bold, varying sizes with proper hierarchy
- **Body**: Medium weight with good readability
- **Data**: Monospace-friendly for numbers and prices

## 🔧 Problem-Solving Approach

### 1. Data Management
**Challenge**: Handling complex petroleum price data across multiple states and fuel types.

**Solution**: 
- Created a centralized data model with TypeScript interfaces
- Implemented utility functions for data filtering and aggregation
- Used React state management for real-time updates

```typescript
interface PetroleumData {
  State: string;
  Period: string;
  AGO: number;
  PMS: number;
  DPK: number;
  LPG: number;
  Region: string;
}
```

### 2. Responsive Design
**Challenge**: Creating a dashboard that works seamlessly across all device sizes. Update will proceed today on this to make seemless responsiveness

**Solution**:
- Implemented mobile-first design with Tailwind CSS
- Used responsive breakpoints (`sm:`, `md:`, `lg:`)
- Created collapsible sidebar for mobile navigation
- Optimized table layouts with horizontal scrolling

### 3. Performance Optimization
**Challenge**: Rendering large datasets without performance degradation.

**Solution**:
- Implemented efficient filtering and search algorithms
- Used React.memo for component optimization
- Lazy loading for chart components
- Optimized re-renders with proper state management

### 4. User Experience
**Challenge**: Making complex data accessible and intuitive.

**Solution**:
- Designed intuitive navigation with clear visual hierarchy
- Implemented real-time search and filtering
- Added interactive charts with hover states
- Created consistent loading and error states

### 5. Code Quality & Maintainability
**Challenge**: Maintaining clean, scalable code architecture.

**Solution**:
- Implemented TypeScript for type safety
- Used ESLint for code consistency
- Created reusable components with clear interfaces
- Followed React best practices and conventions

## 📊 Key Components

### PriceChart Component
- Interactive area charts with customizable time periods
- Modal view for detailed analysis
- Responsive design with touch support
- Custom tooltips and animations

### SearchTable Component
- Real-time search functionality
- Advanced filtering by region and fuel type
- Mini-charts for trend visualization
- Export capabilities

### Sidebar Navigation
- Collapsible design with custom toggle button
- Responsive behavior for mobile devices
- Clear active state indicators
- Smooth animations and transitions

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)




