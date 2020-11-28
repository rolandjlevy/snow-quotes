const express = require('express');
const app = express();
const path = require('path');
const pug = require('pug');
const dotenv = require('dotenv');

const Colours = require('./Colours');
const colours = new Colours();

const port = process.env.PORT;
const baseUrl = process.env.API_URL;

app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index.pug', {  });
});

app.post('/snow', (req, res) => {
  const {letters, quantity, colour } = req.body;
  res.render('snow.pug', {
    letters, 
    quantity,
    colour,
    colours,
    baseUrl
  });
});

app.listen(() => {
  console.log('Listening on port', port || 3000);
});