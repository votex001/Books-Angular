# MyBooks

## Description

MyBooks is a book search and reading platform built with Angular version 19.0.0. Registered users can add books to their favorites and enjoy a seamless reading experience.

## Technologies Used

- Angular
- RxJS
- Node.js
- MongoDB
- Angular Routes

## Installation and Setup

### Backend Setup

1. Create a `.env` file with the following variables:
   ```env
   PORT=<your-port>
   MONGO_URL=<your-mongo-url>
   MONGO_DB_NAME=<your-database-name>
   CRYPTR_PASS=<your-cryptr-password>
   EMAIL_USER=<your-email-user>
   EMAIL_PASS=<your-email-password>
   ```
2. Open a terminal and run:
   ```bash
   npm i
   npm start
   ```

### Frontend Setup

1. Create the following two files:

#### `/env/environment.prod.ts`

```typescript
export const environment = {
  production: true,
  apiUrl: '/api',
  cloudinary: {
    cloudName: 'cloudName',
    uploadPreset: 'uploadPresetName',
    apiKey: 'Cloudinary-key',
    apiSecret: 'Cloudinary-secret',
    apiVar: 'cloudinary://<apiKey>:<apiSecret>-c@<cloudName>'
  }
};
```

#### `/env/environment.ts`

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://127.0.0.1:2027/api',
  cloudinary: {
    cloudName: 'cloudName',
    uploadPreset: 'uploadPresetName',
    apiKey: 'Cloudinary-key',
    apiSecret: 'Cloudinary-secret',
    apiVar: 'cloudinary://<apiKey>:<apiSecret>-c@<cloudName>'
  }
};
```

2. Open a terminal and run:
   ```bash
   npm i
   ng start
   ```

## Project Structure

```
./assets - images
./env - environment configuration files
./app - core application code
```

### Key Folders

- `/app-root`: Root component rendered on the main HTML page.
- `/app/cmps`: All components rendered on different pages.
- `/app/models`: TypeScript models.
- `/app/pages`: Project pages, including:
  - `/auth`: Login, signup, email confirmation, password reset.
  - `/book-details`: Book details page.
  - `/profile-page`: User profile page.
  - `/search-page`: Book search page.
- `/app/resolvers`: Route resolvers for books, text content, email status, reset tokens, and users.
- `/app/services`: Service logic, including:
  - `books`, `user`, `loading`, and `shelfPaginator` services.
  - **ShelfPaginator:** Handles pagination by grouping 32 books from the `gutindex` API into pages with 8 books each or any desired number.
- `/app/app-routing.ts`: Defines application routes.
- `/app/app.module.ts`: Registers all application modules.

## Demo

A free demo is available at [Render](https://render.com/). Please note that the site may load slowly, taking up to 1 minute.

## Backend Routes

- `/books`: Book operations
- `/auth`: User authentication
- `/user`: User operations
- `/fav`: Favorite books

## External APIs

- `gutindex`: Free books API (slow response, returns 0-32 books per page).
