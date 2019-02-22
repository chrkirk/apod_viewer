The app uses NASA's API so if you want to run it locally you will have to get an API key [here](https://api.nasa.gov/index.html#apply-for-an-api-key).
## Getting started
To get the node server running locally:
* Clone this repo
* `npm install` to install all the required dependencies
* set an `API_URL` node environment variable equal to `https://api.nasa.gov/planetary/apod?api_key=your_api_key`
* edit `public/index.js`
```` js
// const url = 'https://apod-viewer-app.herokuapp.com/data';
const url = 'http://localhost:3000/data'; // If you want to run it locally
````
* `npm start` to run

You can try the app online on [https://apod-viewer-app.herokuapp.com/](https://apod-viewer-app.herokuapp.com/)

## Dependencies
* [expressjs](https://github.com/expressjs/express) - The server for handling routing
* [ejs](https://github.com/tj/ejs) - The template engine
* [axios](https://github.com/axios/axios) - Promised based HTTP client
