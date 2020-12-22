const express = require('express');
const app = express();
const path = require('path');
const pug = require('pug');
const shortUrl = require('node-url-shortener');
const dotenv = require('dotenv');
const port = process.env.PORT || 3000;
const baseUrl = process.env.API_URL;

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

app.get('/', (req, res) => {
  const initialInput = '';
  const initialColour = '#e1e1ee';
  const maxAmount = 300;
  res.render('index.pug', {
    initialInput, 
    initialColour, 
    maxAmount
  });
});

app.get('/snow', (req, res) => {
  renderSnow(req, res);
});

app.post('/snow', (req, res) => {
  renderSnow(req, res);
});

const renderSnow = ({req, res}) => {
  const { letters, quantity, colour, multicolour } = res.locals.data;
  res.render('snow.pug', {
    letters,
    quantity,
    colour,
    multicolour,
    colours,
    baseUrl
  });
}

app.get('/shorten', (req, res) => {
  const longUrl = decodeURI(req.query.longurl);
  getShortUrl(longUrl).then(result => {
    res.send(result);
  });
});

const getShortUrl = (longUrl) => {
  return new Promise((resolve, reject) => {
    return shortUrl.short(longUrl, (err, url) => {
      if (err) reject(err);
      resolve(url);
    });
  });
}

const renameDistPackageJsonFile = (views) => {
  if (views.includes('dist')) {
    console.log({views});
    const fs = require('fs');
    const oldPath = path.join(__dirname, 'package-dist.json');
    const newPath = path.join(__dirname, 'package.json');
    try {
      if (fs.existsSync(oldPath)) {
        console.log('rename');
        fs.rename(oldPath, newPath, function (err) {
          if (err) console.log('Error: ' + err);
        });
      }
    } catch(err) {
      console.error(err);
    }
  }
};
const views = path.join(__dirname, 'views');
renameDistPackageJsonFile(views);
app.set('views', views);
app.set('view engine', 'pug');

const Colours = require('./public/src/Colours');
const colours = new Colours();

app.listen(() => {
  console.log('Listening on port', port);
});