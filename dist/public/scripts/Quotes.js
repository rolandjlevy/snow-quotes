'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Quotes = function () {
  function Quotes() {
    var _this = this;

    _classCallCheck(this, Quotes);

    this.fetchQuotes().then(function (result) {
      return _this.list = result;
    });
  }
  // Fetching from quotes API


  _createClass(Quotes, [{
    key: 'fetchQuotes',
    value: function fetchQuotes() {
      var _this2 = this;

      var quotesApiUrl = 'https://type.fit/api/quotes';
      return new Promise(function (resolve, reject) {
        return fetch(quotesApiUrl).then(function (res) {
          return res.json();
        }).then(function (data) {
          var quotes = _this2.filteredQuotes(data);
          resolve(quotes);
        });
      });
    }
    // Randomise array

  }, {
    key: 'shuffle',
    value: function shuffle(arr) {
      return arr.sort(function () {
        return Math.random() - 0.5;
      });
    }
    // Filter out words in ignoreList

  }, {
    key: 'filteredQuotes',
    value: function filteredQuotes(arr) {
      var ignoreList = ['tenzin', 'trump', 'dalai', 'yeshe', 'eckhart', 'baba', 'sogyal'];
      var filtered = arr.reduce(function (acc, item) {
        var ignore = item.author && item.author.split(' ').some(function (word) {
          return ignoreList.includes(word.toLowerCase());
        });
        if (ignore == false) {
          acc.push(item);
        }
        return acc;
      }, []);
      return this.shuffle(filtered);
    }
  }]);

  return Quotes;
}();

exports.default = Quotes;