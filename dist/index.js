'use strict';

var express = require('express');
var app = express();
var path = require('path');
var pug = require('pug');
var shortUrl = require('node-url-shortener');
var dotenv = require('dotenv');
var port = process.env.PORT || 3000;
var baseUrl = process.env.API_URL;

app.use(function (req, res, next) {
  req.rawBody = '';
  req.on('data', function (chunk) {
    return req.rawBody += chunk;
  });
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.locals.data = req.rawBody ? req.body : req.query;
  next();
});

app.use(express.static('public'));

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
    baseUrl: baseUrl
  });
};

app.get('/shorten', function (req, res) {
  var longUrl = decodeURI(req.query.longurl);
  getShortUrl(longUrl).then(function (result) {
    res.send(result);
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

var renameDistPackageJsonFile = function renameDistPackageJsonFile(views) {
  if (views.includes('dist')) {
    console.log({ views: views });
    var fs = require('fs');
    var oldPath = path.join(__dirname, 'package-dist.json');
    var newPath = path.join(__dirname, 'package.json');
    try {
      if (fs.existsSync(oldPath)) {
        console.log('rename');
        fs.rename(oldPath, newPath, function (err) {
          if (err) console.log('Error: ' + err);
        });
      }
    } catch (err) {
      console.error(err);
    }
  }
};
var views = path.join(__dirname, 'views');
renameDistPackageJsonFile(views);
app.set('views', views);
app.set('view engine', 'pug');

var Colours = require('./public/src/Colours');
var colours = new Colours();

app.listen(function () {
  console.log('Listening on port', port);
});