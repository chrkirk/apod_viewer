const API_URL = process.env.API_URL;
const axios = require('axios');

// photo_obj: object returned by the api for a single day

// Returns today's photo_obj
async function getCurrentPhoto(req, res, next) {
  const data = await axios.get(API_URL)
    .then((res) => {
      return res.data;
    }).catch((error) => {
      return error;
    });
  req.currentPhoto = data;
  next();
}

// Returns an array of photo_obj
async function getPhotos(req, res, next) {
  const start_date = formatDate(subtractFromCurrentDate(12));
  // If start_date is specified without an end_date then end_date defaults to the current date
  const data = await axios.get(API_URL + `&start_date=${start_date}`)
    .then((res) => {
      return res.data;
    }).catch((error) => {
      console.log(error);
      return {};
    });
  req.photos = data;
  next();
}

function subtractFromCurrentDate(days) {
  const today = new Date();
  return new Date(today.setDate(today.getDate() - days));
}

// Returns a string date formated as YYYY-MM-DD
function formatDate(date) {
  // date.getMonth() returns 0 for January and so on, 
  // we add +1 to get the right format for the api call
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

module.exports = {
  getCurrentPhoto: getCurrentPhoto,
  getPhotos: getPhotos
}