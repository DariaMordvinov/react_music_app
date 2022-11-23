const express = require('express');
const path = require('path');
require('dotenv').config();

const gameController = require('./controllers/gameController');
const bodyParser = require("body-parser");

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(bodyParser.json());
app.use(express.static('client'))

app.use('/', 
  gameController.getArtistId, 
  gameController.getArtistOptions, 
  gameController.getTrack, (req, res) => {
  // return res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
  return res.setHeader('Access-Control-Allow-Origin', '*').status(200).json({artists: res.locals.arr, winner: res.locals.winner});
})

// check if we're listening on the right port
app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
  });
  
module.exports = app;