const express = require('express');
const app = express();
const path = require('path');
const pug = require('pug');
const fs = require('fs');
const cors = require('cors');
const shortUrl = require('node-url-shortener');
const dotenv = require('dotenv');

app.use((req, res, next) => {
  req.rawBody = '';
  req.on('data', (chunk) => req.rawBody += chunk);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
  let origins = ['https://snow-quotes.rolandjlevy.repl.co/'];
  if (origins.includes(req.query.origin)) {
    res.header("Access-Control-Allow-Origin", req.query.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  }
  next();
});

app.use((req, res, next) => {
  res.locals.data = req.rawBody ? req.body : req.query;
  next();
});

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
    quotesApiUrl
  });
}

app.get('/shorten', (req, res) => {
  const longUrl = decodeURI(req.query.longurl);
  getShortUrl(longUrl).then(result => {
    res.send(result);
  }).catch(err => {
    console.log('/shorten error:', err)
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

const renameFile = (oldFileName, newFileName) => {
  if (views.includes('dist')) {
    const oldPath = path.join(__dirname, oldFileName);
    const newPath = path.join(__dirname, newFileName);
    try {
      if (fs.existsSync(oldPath)) {
        fs.rename(oldPath, newPath, (err) => {
          if (err) console.log('Error: ' + err);
        });
      }
    } catch(err) {
      console.error(err);
    }
  }
}

app.use(express.static('public'));
const views = path.join(__dirname, 'views');

const port = process.env.PORT || 3000;
const quotesApiUrl = process.env.API_URL || 'https://type.fit/api/quotes';

renameFile('package-dist.json', 'package.json');
renameFile('data.txt', '.env');

app.set('views', views);
app.set('view engine', 'pug');

const coloursPath = path.join(__dirname, '/public/src/Colours.js');
const Colours = require(coloursPath);
const colours = new Colours();

app.listen(() => {
  console.log('Listening on port', port);
});