# Kotolog - Pet Shelter Application

![Project Badge](https://img.shields.io/badge/NextJs-purple) ![Database Badge](https://img.shields.io/badge/database-PostgreSQL-blue) ![Auth Badge](https://img.shields.io/badge/auth-GitHub%20OAuth-orange)

## Table of Contents
- [Description](#description)
- [Features](#features)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Usage](#usage)
- [Routes](#routes)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Description
Kotolog is a web application for pet shelters, enabling users to manage pet listings, upload photos, and authenticate via GitHub. Currently, the application accepts dogs and cats as pet types.

## Features
- Pet Editor for adding and updating pet details
- Admin route for managing the application
- S3 storage integration for pet photos
- GitHub OAuth for user authentication
- User-friendly interface for pet shelters

## Screenshots
![Screenshot](link-to-screenshot.jpg)

## Installation
To set up project locally, follow these steps:

1. Clone and enter the repository:
   ```bash
   git clone https://github.com/yourusername/kotolog.git
   cd kotolog
   ```
2. Install dependencies:
   ```bash
   npm install
   # or 
   pnpm install
   # or 
   yarn install
   ```
3. Copy .env.example into .env
   ```bash
   cp .env.example .env
   ```
4. Fill all fields in .env

5. Run database migration:
   ```bash
   npx prisma migrate dev
   # or
   pnpm prisma migrate dev
   # or
   yarn prisma migrate dev
   ```
6. Start the development server
   ```bash
   npm run dev
   # or
   pnpm run dev
   # pr
   yarn run dev
   ```
   The app should now be running on http://localhost:3000.
   Usage

   Visit /app as the entry point.
   Access admin features at /admin.
   Navigate to /koshki for users, where /app redirects.

Routes

    /app: Entry point
    /admin: Admin route for managing the application
    /koshki: Main user-facing route for pets

## Technologies Used

    Framework: Next.js
    Database: PostgreSQL (with Prisma ORM)
    Storage: AWS S3 for image uploads
    Authentication: GitHub OAuth
    Languages: JavaScript / TypeScript

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes. Ensure all new features are documented and tests are included.

## License

This project is licensed under the MIT License. See the LICENSE file for details.