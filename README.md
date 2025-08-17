# Seller Console - Lead Management System

A modern, responsive lead management system built with React, TypeScript, and Tailwind CSS. This application helps sales teams manage leads, convert them to opportunities, and track their progress through the sales pipeline.

## Ideas and IA

Got my ideas for the UI/UX design from https://uitify.com/case-studies.
Used Cursor for Fixing Bugs, generating data mocks and basicly making myself faster and precise in developing a web-app.

## 🚀 Features

### Core Functionality

- **Lead Management**: View, search, filter, and manage leads
- **Opportunity Conversion**: Convert qualified leads to opportunities
- **Responsive Design**: Optimized for desktop and mobile devices
- **Real-time Search**: Debounced search with instant filtering
- **Sorting**: Sort leads by score (ascending/descending)
- **Status Tracking**: Track lead status (New, Contacted, Qualified, Unqualified)

### User Interface

- **Modern UI**: Clean, professional interface with Tailwind CSS
- **Mobile-First**: Responsive design that works on all devices
- **Interactive Components**: Smooth animations and transitions
- **Loading States**: Proper loading indicators and error handling
- **Detail Panels**: Inline editing of lead information

### Technical Features

- **TypeScript**: Full type safety and better development experience
- **React Hooks**: Modern React patterns with useState, useEffect, useMemo
- **Performance Optimized**: Debounced search, memoized components
- **Error Handling**: Graceful error handling with user feedback
- **Mock Data**: 100+ sample leads for testing and demonstration

## 📱 Responsive Design

### Mobile Layout (< 1024px)

- **Top Navigation**: Horizontal menu at the top with dropdown
- **Full-Screen Leads**: Leads section takes most of the screen height
- **Scroll Navigation**: Opportunities appear below, requiring page scroll
- **Touch Optimized**: Large touch targets and mobile-friendly interactions

### Desktop Layout (≥ 1024px)

- **Side Navigation**: Vertical menu on the left with toggle functionality
- **Side-by-Side Layout**: Leads and Opportunities displayed side by side
- **Independent Scrolling**: Each section has its own scroll area
- **Hover Effects**: Rich desktop interactions and hover states

## 🛠️ Technology Stack

- **Frontend Framework**: React 19.1.1
- **Language**: TypeScript 5.8.3
- **Styling**: Tailwind CSS 4.1.12
- **Build Tool**: Vite 7.1.2
- **Icons**: Lucide React
- **Linting**: ESLint 9.33.0

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd uitify-console
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`
