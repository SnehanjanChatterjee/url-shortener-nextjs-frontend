<details>

<summary>
How to Create & Deploy a new Next.js App
</summary>

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

</details>

<details open>

<summary>
How to run the app locally
</summary>

## Prerequisites

1. **Node.js 22+** - Ensure you have Node.js version 22 or later installed. You can download it from [Node.js Official Site](https://nodejs.org/).

2. **npm** or **yarn** or **pnpm** - A package manager to install dependencies. npm comes with Node.js, but you can also use yarn / pnpm if preferred.

## Clone the Repository

1. Fork the repository using the **Fork** button at the top-right corner of the repository page.
2. Clone the forked repository:

```
git clone https://github.com/yourusername/nextjs-app.git
cd nextjs-app
```

## Install Dependencies
Run the following command in the project directory to install all required dependencies:

```node
npm install
```
### or
```node
yarn install
```
### or
```node
pnpm install
```

## Configure Environment Variables
If your project uses environment variables, create a .env file in the root directory and add the required variables. Example:

```
NEXT_PUBLIC_BACKEND_CLOUD_ENDPOINT=<base-url-of-hosted-backend-server>
NEXT_PUBLIC_BACKEND_REST_PATH=<rest-api-path-of-backend-service>
```

Ensure you do not commit sensitive data by adding .env to .gitignore:

```
echo ".env*" >> .gitignore
```

## Run the Development Server
Start the development server using:

```node
npm run dev
```
### or
```node
yarn dev
```
### or
```node
pnpm dev
```
The server will start, and the application will be accessible at http://localhost:3000.

</details>