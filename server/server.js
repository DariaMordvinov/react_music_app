const express = require('express');
const path = require('path');

const gameController = require('./controllers/gameController');
const bodyParser = require("body-parser");

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(bodyParser.json());

app.use('/', gameController.getOptions, (req, res) => {
  // return res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
  return res.setHeader('Access-Control-Allow-Origin', '*').status(200).json(res.locals.token);
})

// check if we're listening on the right port
app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
  });
  
module.exports = app;