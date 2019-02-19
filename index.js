const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const middleware = require('./middleware');
const { getCurrentPhoto, getPhotos } = middleware;  // destructuring assignment

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {  
  res.render('index');
});

// The server makes the API call for the data so that the API key remains hidden from the client.
// Then the client fetches the data from the server.
app.get('/data', getPhotos, (req, res) => {  
  res.send(req.photos);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));