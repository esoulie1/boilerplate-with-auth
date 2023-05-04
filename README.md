# Boilerplate RemixJS With auth

This is a web application built with RemixJS, Prisma with MongoDB, Tailwind CSS, and TypeScript.

## Features

- Home
- Sign In
- Sign Up

## Requirements

- Node.js (>=18)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/esoulie1/boilerplate-with-auth.git
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your environment variables. You can use the `.env.example` file as a template.
   ```bash
   cp .env.example .env
   ```
4. Start the application
   ```bash
   npm start
   ```
5. Open your browser and navigate to `http://localhost:3000`

## Environment Variables

The application requires the following environment variables:

- `DATABASE_URL`: The URL of the MongoDB database.
- `SESSION_SECRET`: A secret string used to sign session cookies.

## Technologies Used

- [RemixJS](https://remix.run/)
- [Prisma](https://www.prisma.io/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
