[![CI](https://github.com/perkinsjr/t3-turbo-and-clerk/actions/workflows/ci.yml/badge.svg)](https://github.com/perkinsjr/t3-turbo-and-clerk/actions/workflows/ci.yml)

# Create T3 Turbo with Clerk Authentication

## Clerk Dashboard Setup

For this template to work you need to enable Discord as an OAuth provider. You can find the social options under `User & Authentication / Social Providers` in the [Clerk Dashboard](https://dashboard.clerk.dev)

> If you change any setting here outside of adding Discord, you may need to update your Expo code to handle any requirements you change.

It uses [Turborepo](https://turborepo.org/) and contains:

## Code Layout

```
.github
  └─ workflows
        └─ CI with pnpm cache setup
.vscode
  └─ Recommended extensions and settings for VSCode users
apps
  ├─ expo
  └─ next.js
      ├─ Next.js 13
      ├─ React 18
      └─ E2E Typesafe API Server & Client
packages
 ├─ api
 |   └─ tRPC v10 router definition
 └─ db
     └─ typesafe db-calls using Prisma
```

## Quick Start

To get it running, follow the steps below:

### Setup dependencies

```diff
# Install dependencies
pnpm i

# In packages/db/prisma update schema.prisma provider to use sqlite
# or use your own database provider
- provider = "mysql"
+ provider = "sqlite"

# Configure environment variables.
# There is an `.env.example` in the root directory you can use for reference
cp .env.example .env

# Push the Prisma schema to your database
pnpm db-push

#### Deploy to Vercel

Let's deploy the Next.js application to [Vercel](https://vercel.com/). If you have ever deployed a Turborepo app there, the steps are quite straightforward. You can also read the [official Turborepo guide](https://vercel.com/docs/concepts/monorepos/turborepo) on deploying to Vercel.

1. Create a new project on Vercel, select the `apps/nextjs` folder as the root directory and apply the following build settings:

<img width="927" alt="Vercel deployment settings" src="https://user-images.githubusercontent.com/11340449/201974887-b6403a32-5570-4ce6-b146-c486c0dbd244.png">

> The install command filters out the expo package and saves a few second (and cache size) of dependency installation. The build command makes us build the application using Turbo.

2. Add your `DATABASE_URL`,`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` environment variable.

## References

The stack originates from [create-t3-turbo](https://github.com/t3-oss/create-t3-turbo).
```
