# Stream Fellas (frontend)

Frontend layer of Stream Fellas - simple application for uploading, browsing and rating streamers.

## Features

Main page

- Streamer submit form - create your own streamer with a given name, description and streaming platform
- Streamers list - provides you with the live-updated, clickable list of all streamers with their current upvote and downvote status
  Streamer profile page
- Streamer profile - get an extended set of information regarding individual streamer including name, description, streaming platform as well as their profile image

## Main technologies used

- JavaScript
- Vite
- React.js
- Axios
- React Router
- Realm Web

## Installation

1. Clone repository:

   git clone https://github.com/mateuszkwasniak/stream-fellas-frontend.git

2. Navigate to the project's folder:

   cd stream-fellas-frontend

3. Install dependencies:

   npm install

## Configuration

Please note this project is the frontend layer of the Stream Fellas application. In order to make it work fully you have to configure the backend layer (API server) which can be found here: [Stream Fellas (backend)](https://github.com/mateuszkwasniak/stream-fellas-backend). There are four environment variables used in the frontend part of the application for both development and production mode that have to be set up:

1. VITE_BACKEND_URL - URL of the backend server

2. VITE_MONGO_APP_ID - ID of the application from Application Services in MongoDB Atlas (required for the live-updates of the streamers list; follow instructions in the README file of the backend layer in order to obtain the same)

3. VITE_MONGO_APP_DB - name of the database (with streamers collection) in the MongoDB Atlas cluster that will be watched for changes

4. VITE_MONGO_APP_COLLECTION - name of the collection (with streamers documents) in the MongoDB Atlas cluster that will be watched for changes

\*If you are from Dare Drop, you can use pre-configured variables inside '.env.development' file along with the backend layer variable in order to start your project locally without extensive configuration 😉

## Running application locally

npm run dev

## Building the application

npm run build

## Demo

You can find the demo version of the application here: [Stream Fellas](https://stream-fellas.netlify.app/). Frontend layer is hosted on Netlify, backend on Render.
Please note that the free tier of Render services is used. As per their documentation: "Web Services on free instance type automatically spun down after 15 minutes of inactivity. When a new request for a free service comes in, Render spins it up again so it can process the request. This will cause a delay in the response of the first request after a period of inactivity while the instance spins up." Please be patient as it might take some time to load the streamers list initially!
