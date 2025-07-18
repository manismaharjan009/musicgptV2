# MusicGPT V2 - AI

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Overview

MusicGPT V2 is an AI-powered music creation platform that allows users to create music and convert text to speech using various AI voices.

### Core Features

- **AI Music Creation**: Generate music from text prompts
- **Text-to-Speech**: Convert text to speech with multiple voice options
- **Voice Selection**: Browse and select from a curated collection of AI voices
- **Real-time Results**: View processing status and results in real-time

## Project Structure

```
musicgptV2/
├── 📁 src/
│   └── 📁 app/
│       ├── 📁 api/                    # API Routes
│       │   ├── 📁 voices/             # Voice data endpoints
│       │   │   └── route.ts           # GET /api/voices (paginated)
│       │   └── 📁 prompt/             # Prompt processing endpoints
│       │       └── route.ts           # POST /api/prompt
│       ├── 📁 components/             # Reusable UI Components
│       │   ├── AutoResizeTextarea.tsx # Auto-resizing text input
│       │   ├── ContentSection.tsx     # Main content area
│       │   ├── Header.tsx             # Navigation header
│       │   ├── PopoverButton.tsx      # Tools dropdown
│       │   ├── ResultPopup.tsx        # Results display popup
│       │   ├── VoiceList.tsx          # Voice selection grid
│       │   └── VoiceSkeleton.tsx      # Loading skeleton
│       ├── 📁 hooks/                  # Custom React hooks
│       ├── globals.css                # Global styles & animations
│       ├── layout.tsx                 # Root layout
│       └── page.tsx                   # Main page
├── 📁 public/                         # Static assets
│   └── 📁 svg/                        # SVG icons
├── 📄 voice.json                      # Voice data (mock)
├── 📄 package.json                    # Dependencies & scripts
├── 📄 Dockerfile                      # Production container
├── 📄 Dockerfile.dev                  # Development container
└── 🐳 docker-compose.yml              # Container orchestration
```

## 🎨 Design Decisions

### Architecture & Framework

- **Next.js 15** with App Router for modern React development
- **TypeScript** for type safety and better developer experience
- **Tailwind CSS v4** for utility-first styling
- **Docker** for containerized deployment (dev & prod)

### UI/UX Design Principles

#### Dark Theme & Glassmorphism

- Dark background
- Glassmorphism effects with backdrop blur
- Semi-transparent overlays
- Subtle borders

#### Animation Strategy

- **Smooth Transitions**
- **Slide Animations**
- **Scroll Animations**
- **Loading States**

### API Design

#### RESTful Endpoints

- `GET /api/voices?page=1&limit=9` - Paginated voice data
- `POST /api/prompt` - Process user prompts

### Performance Optimizations

#### Frontend

- **Infinite Scroll**
- **Intersection Observer**
- **Component Memoization**
- **Image Optimization**

#### Backend

- **Pagination**
- **Error Handling**
- **Mock Data**: Fast development iteration

### Development Experience

#### Code Quality

- **ESLint** + **Prettier** for consistent formatting
- **Husky** + **lint-staged** for pre-commit hooks
- **TypeScript** for compile-time error checking

#### Docker Workflow

- **Multi-stage builds** for production optimization
- **Development hot-reload** with volume mounting
- **Non-root user** for security

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Docker (optional, for containerized development)

### Local Development

First, install dependencies:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Available Scripts

```bash
# Development
npm run dev              # Start development server with Turbopack
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting
```

## Docker Setup

This project includes Docker configuration for both development and production environments.

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running

### Quick Start with Docker

#### Production Build

```bash
# Build and run production container
npm run docker:build
npm run docker:run

# Or use docker-compose
npm run docker:prod
```

#### Development with Hot Reload

```bash
# Run development container with hot reload
npm run docker:dev
```

#### Stop Containers

```bash
npm run docker:stop
```

### Manual Docker Commands

#### Production

```bash
# Build the image
docker build -t musicgptV2 .

# Run the container
docker run -p 3000:3000 musicgptV2
```

#### Development

```bash
# Build and run development container
docker build -f Dockerfile.dev -t musicgptV2-dev .
docker run -p 3000:3000 -v $(pwd):/app -v /app/node_modules musicgptV2-dev
```

#### Using Docker Compose

```bash
# Production
docker-compose up app

# Development (with hot reload)
docker-compose --profile dev up dev

# Stop all services
docker-compose down
```

### Docker Configuration Files

- `Dockerfile` - Multi-stage production build with optimizations
- `Dockerfile.dev` - Development build with hot reloading
- `docker-compose.yml` - Container orchestration for both environments
- `.dockerignore` - Excludes unnecessary files from build context

### Docker Features

- **Multi-stage builds** for smaller production images
- **Non-root user** for security
- **Standalone output** for optimal performance
- **Development hot-reload** support
- **Layer caching** optimization

## Technology Stack

### Frontend

- **Next.js 15**
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **clsx**

### Backend

- **Next.js API Routes**
- **Node.js**

### Development Tools

- **ESLint**
- **Prettier**
- **Husky**
- **Docker**

### Dependencies

- **react-tiny-popover**
