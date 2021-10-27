'use strict';

var express = require('express');
var app = express();
var path = require('path');
var pug = require('pug');
var fs = require('fs');
var cors = require('cors');
var shortUrl = require('node-url-shortener');
var dotenv = require('dotenv');

app.use(function (req, res, next) {
  req.rawBody = '';
  req.on('data', function (chunk) {
    return req.rawBody += chunk;
  });
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(function (req, res, next) {
  var origins = ['https://snow-quotes.rolandjlevy.repl.co/'];
  if (origins.includes(req.query.origin)) {
    res.header("Access-Control-Allow-Origin", req.query.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  }
  next();
});

app.use(function (req, res, next) {
  res.locals.data = req.rawBody ? req.body : req.query;
  next();
});

app.get('/', function (req, res) {
  var initialInput = '';
  var initialColour = '#e1e1ee';
  var maxAmount = 300;
  res.render('index.pug', {
    initialInput: initialInput,
    initialColour: initialColour,
    maxAmount: maxAmount
  });
});

app.get('/snow', function (req, res) {
  renderSnow(req, res);
});

app.post('/snow', function (req, res) {
  renderSnow(req, res);
});

var renderSnow = function renderSnow(_ref) {
  var req = _ref.req,
      res = _ref.res;
  var _res$locals$data = res.locals.data,
      letters = _res$locals$data.letters,
      quantity = _res$locals$data.quantity,
      colour = _res$locals$data.colour,
      multicolour = _res$locals$data.multicolour;

  res.render('snow.pug', {
    letters: letters,
    quantity: quantity,
    colour: colour,
    multicolour: multicolour,
    colours: colours,
    quotesApiUrl: quotesApiUrl
  });
};

app.get('/shorten', function (req, res) {
  var longUrl = decodeURI(req.query.longurl);
  getShortUrl(longUrl).then(function (result) {
    console.log('/shorten result:', result);
    res.send(result);
  }).catch(function (err) {
    console.log('/shorten error:', err);
  });
});

var getShortUrl = function getShortUrl(longUrl) {
  return new Promise(function (resolve, reject) {
    return shortUrl.short(longUrl, function (err, url) {
      if (err) reject(err);
      resolve(url);
    });
  });
};

var renameFile = function renameFile(oldFileName, newFileName) {
  if (views.includes('dist')) {
    var oldPath = path.join(__dirname, oldFileName);
    var newPath = path.join(__dirname, newFileName);
    try {
      if (fs.existsSync(oldPath)) {
        fs.rename(oldPath, newPath, function (err) {
          if (err) console.log('Error: ' + err);
        });
      }
    } catch (err) {
      console.error(err);
    }
  }
};

app.use(express.static('public'));
var views = path.join(__dirname, 'views');

var port = process.env.PORT || 3000;
var quotesApiUrl = process.env.API_URL || 'https://type.fit/api/quotes';

renameFile('package-dist.json', 'package.json');
renameFile('data.txt', '.env');

app.set('views', views);
app.set('view engine', 'pug');

var coloursPath = path.join(__dirname, '/public/src/Colours.js');
var Colours = require(coloursPath);
var colours = new Colours();

app.listen(function () {
  console.log('Listening on port', port);
});