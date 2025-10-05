# MyBooks

## Description

This project was created to practice Angular functionality after self-learning.
The main goal was to build a Book Searching Application with authentication, favorites, and profile management features.

## Features:

 - Search books by title or author
 - User authentication (login / logout)
 - Favorite books — add, view, and remove
 - profile page — change profile image
 - Pagination — 32 books split into pages of 9 with cached navigation
 - Global state management for user and book data using custom pipes
 - Reusable components created for multiple use cases
 - Routing & Resolvers — practiced route handling and data fetching


## Docker Practice

- This project is also used to learn and practice Docker:
- Building and running containers
- Creating a docker-compose.yml file
- Working with Dev Containers (Rebuild and Reopen in Container in VS Code)

This setup allows coding in an isolated environment without installing many dependencies locally, and helps avoid cross-system compatibility issues.

## Frontend Tech Stack:

 - Framework: Angular
 - State Management: Custom service with pipes

##Backend:
 - Framework: Express
 - libraries: bcrypt, nodemailer, cookie-parser,nodemon.

## Docker use
 - Containerization: Docker, Docker Compose
 - IDE Integration: VS Code Dev Containers



## Technologies Used

- Angular
- RxJS
- Node.js
- MongoDB
- Angular Routes
- Express
- bcrypt
- cookie-parser
- cors

## Installation and Setup

### Server Setup

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

### Client Setup

1. Create the following two files:

#### `/client/env/environment.prod.ts`

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

#### `/client/env/environment.ts`

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
### Dev Container Setup

The easiest way to begin developing this project is to use a dev container. An introduction to dev containers in VSCode can be found [here](https://code.visualstudio.com/docs/devcontainers/containers).

Required Software:

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [VSCode](https://code.visualstudio.com/download)

_Note, it is possible to use other container software than Docker and IDEs other than VSCode. However, this setup is more complicated and not covered here._

<div>
<details>
<summary>Install the required software on Windows with <a href=(https://docs.microsoft.com/en-us/windows/package-manager/winget/#production-recommended)>winget</a></summary>

<p>
Note: This requires a PowerShell prompt with winget installed.  You should be able to copy and paste the code block to install.  If you use an elevated PowerShell prompt, UAC will not pop up during the installs.

```PowerShell
winget install -e --id Docker.DockerDesktop; `
winget install -e --id Microsoft.VisualStudioCode
```

</p>
</details>
</div>

<div>
<details>
<summary>Install the required software on MacOS with <a href=(https://snapcraft.io/)>homebrew</a></summary>

<p>

```sh
brew install --cask docker visual-studio-code
```

</p>
</details>
</div>

<div style="padding-bottom: 1em">
<details>
<summary>Install the required software on Linux with <a href=(https://brew.sh/)>snap</a></summary>

<p>

```sh
sudo snap install docker; \
sudo snap install code --classic
```

</p>
</details>
</div>

After installing these packages, you can now install the [Remote Development](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack) extension for VSCode. After installing this extension open the command pallet (`ctrl+shift+p` or `cmd+shift+p`) and select the command `>Dev Containers: Rebuild and Reopen in Container`. This will cause the development environment container to be built and launched.

You are now ready to start development!

### Development Commands

After setting up your development environment, either using the dev container or using your own custom environment, the following commands will help you run the server and client.

To run the server, you can use the command `npm run dev` or `npm run dev-linux` if you working on linux/Docker . This will use the client that was built when you ran `npm run build` in the client directory or when you started the dev container. If you make changes to the server, you will need to restart the server. If you make changes to the client, you will need to run the command `(cd client; npm run build)` and then restart the server. By default the client runs at `localhost:2027`, though the port can be configured in `.env`.

You can also build a version of the client that supports live reloading. To do this, start the server, then run the command `(cd client; npm run dev)`. This will run a separate instance of the client at `localhost:4200` that will be automatically updated as you make changes to the client.


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

A free demo is available at [Render](https://mybooks-w2ls.onrender.com). Please note that the site may load slowly, taking up to 1 minute.

## Backend Routes

- `/books`: Book operations
- `/auth`: User authentication
- `/user`: User operations
- `/fav`: Favorite books

## External APIs

- `gutindex`: Free books API (slow response, returns 0-32 books per page).
