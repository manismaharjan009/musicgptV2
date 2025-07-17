This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

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
docker build -t demo-assessment .

# Run the container
docker run -p 3000:3000 demo-assessment
```

#### Development

```bash
# Build and run development container
docker build -f Dockerfile.dev -t demo-assessment-dev .
docker run -p 3000:3000 -v $(pwd):/app -v /app/node_modules demo-assessment-dev
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

### Features

- **Multi-stage builds** for smaller production images
- **Non-root user** for security
- **Standalone output** for optimal performance
- **Development hot-reload** support
- **Layer caching** optimization

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
