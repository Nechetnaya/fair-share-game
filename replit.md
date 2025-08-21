# Fair Share Game

## Overview

Fair Share is an interactive web game designed to help couples and families visualize how household responsibilities are distributed. The application presents a card-based interface where users assign domestic tasks to different participants, providing insights into workload balance through supportive, research-backed feedback. Built as a full-stack application with a React frontend and Express backend, it emphasizes user-friendly interaction and data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Components**: Comprehensive component library built on Radix UI primitives with shadcn/ui styling
- **Styling**: Tailwind CSS with CSS variables for theming, featuring a minimalist Scandinavian design aesthetic
- **Routing**: Client-side routing implemented with Wouter for lightweight navigation
- **State Management**: Local component state with React hooks, complemented by localStorage for game persistence
- **Data Fetching**: TanStack Query (React Query) for server state management and API calls

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints for game result storage and retrieval
- **Data Storage**: In-memory storage with MemStorage class (designed for easy PostgreSQL migration)
- **Development**: Hot module replacement via Vite integration in development mode

### Data Storage Solutions
- **Primary Storage**: Currently uses in-memory storage with Map-based data structures
- **Local Persistence**: Browser localStorage for game state preservation across sessions
- **Database Ready**: Drizzle ORM configuration prepared for PostgreSQL integration
- **Schema**: Defined data models for game results with proper TypeScript inference

### Authentication and Authorization
- **Current State**: No authentication system implemented
- **Session Handling**: Basic session support infrastructure present but unused
- **Future Ready**: Architecture supports easy integration of authentication middleware

### Game Logic Architecture
- **Task Generation**: Dynamic task list generation based on user-selected conditions (home type, children, pets, car)
- **Progress Tracking**: Real-time game state management with step-by-step task assignment
- **Result Calculation**: Automatic percentage calculations and balance analysis
- **Feedback System**: Supportive messaging system with research-backed quotes and encouragement

## External Dependencies

### Core Framework Dependencies
- **@vitejs/plugin-react**: React support for Vite build system
- **wouter**: Lightweight client-side routing library
- **@tanstack/react-query**: Server state management and data fetching

### UI and Design Dependencies
- **@radix-ui/***: Collection of accessible UI primitives (accordion, dialog, dropdown, etc.)
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe CSS class variants
- **clsx**: Conditional CSS class composition utility
- **lucide-react**: Icon library for consistent iconography

### Development and Build Dependencies
- **typescript**: Type checking and compilation
- **vite**: Fast build tool and development server
- **esbuild**: JavaScript bundler for production builds
- **tsx**: TypeScript execution for development server

### Database and Schema Dependencies
- **drizzle-orm**: Type-safe SQL query builder
- **drizzle-kit**: Database migration and management tools
- **@neondatabase/serverless**: PostgreSQL driver for serverless environments
- **zod**: Runtime type validation for API schemas

### Development Experience Dependencies
- **@replit/vite-plugin-runtime-error-modal**: Enhanced error reporting in Replit environment
- **@replit/vite-plugin-cartographer**: Development tooling for Replit integration