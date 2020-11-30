const express = require('express');
const app = express();
const path = require('path');
const pug = require('pug');
const dotenv = require('dotenv');
const tinyURL = require('tinyurl');
const port = process.env.PORT || 3000;
const baseUrl = process.env.API_URL;

const Colours = require('./Colours');
const colours = new Colours();

app.use((req, res, next) => {
  req.rawBody = '';
  req.on('data', (chunk) => req.rawBody += chunk);
  next();  
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.locals.data = req.rawBody ? req.body : req.query;
  next();
});

app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index.pug', {});
});

app.get('/snow', (req, res) => {
  renderSnow(req, res);
});

app.post('/snow', (req, res) => {
  renderSnow(req, res);
});

const renderSnow = ({req, res}) => {
  const { letters, quantity, colour } = res.locals.data;
  res.render('snow.pug', {
    letters,
    quantity,
    colour,
    colours,
    baseUrl
  });
}

app.listen(() => {
  console.log('Listening on port', port);
});