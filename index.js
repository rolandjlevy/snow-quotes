const express = require('express');
const app = express();
const path = require('path');
const pug = require('pug');

app.use(express.urlencoded({ extended: true}));

app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index.pug');
});

app.post('/snow', (req, res) => {
  const letters = req.body.letters;
  console.log(letters)
  res.render('snow.pug', {letters});
});

app.listen(() => {
  console.log('Listening on port', 3000);
});