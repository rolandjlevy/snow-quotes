'use strict';

var _Sharing = require('./Sharing.js');

var _Sharing2 = _interopRequireDefault(_Sharing);

var _Toast = require('./Toast.js');

var _Toast2 = _interopRequireDefault(_Toast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isTag = function isTag(str) {
  return (/<[^>]*>/g.test(str)
  );
};
var withinFontFaceSet = function withinFontFaceSet(str) {
  return (/^[0-9a-zA-Z.]+$/g.test(str)
  );
};

var sharing = new _Sharing2.default();

var toast = new _Toast2.default();
toast.init();

// Validate all input fields
$$('input').forEach(function (item) {
  item.addEventListener('input', function (e) {
    return validate();
  });
});

// Validate
var validate = function validate() {
  var errors = 0;
  errors += $('input.letters').value ? 0 : 1;
  errors += $('input.quantity').value > 0 ? 0 : 1;
  if (errors > 0) {
    toggleButtons('add');
    return;
  }
  toggleButtons('remove');
  $('.btn.start').href = sharing.getQueryString();
  $('input.hidden.url').value = location.origin + sharing.getQueryString();
};

// Toggle disabled state of all buttons
var toggleButtons = function toggleButtons(action) {
  $$('.btn, input.colour').forEach(function (item) {
    item.classList[action]('disabled');
  });
};

// Validate input for letters (a-z and 0-9)
$('input.letters').addEventListener('input', function (e) {
  var input = e.target.value;
  $('.display-text').textContent = input;
  if (isTag(input)) {
    e.target.value = '⚠️';
    return;
  }
  if (!withinFontFaceSet(input)) {
    var str = $('input.letters').value.slice(0, -1);
    $('.display-text').textContent = str;
    e.target.value = str;
    return;
  }
});

// Set the caret to the end of letters
$('input.letters').addEventListener('focus', function (e) {
  var input = e.target.value;
  e.target.value = '';
  e.target.value = input;
});

// Validate quantity input
$('input.quantity').addEventListener('input', function (e) {
  var _e$target = e.target,
      value = _e$target.value,
      max = _e$target.max;
  var _ref = [Number(value), Number(max)],
      nValue = _ref[0],
      nMax = _ref[1];

  if (nValue > nMax) e.target.value = nMax;
  if (nValue < 1) e.target.value = '';
});

// Turn multicolour on
$('.btn.multicolour').addEventListener('click', function (e) {
  $('.colour-group.colour').classList.remove('active');
  $('.colour-group.multicolour').classList.add('active');
  $('input[name=multicolour]').value = 1;
  validate();
});

// Turn colour on
$('input.colour').addEventListener('click', function (e) {
  $('.colour-group.colour').classList.add('active');
  $('.colour-group.multicolour').classList.remove('active');
  $('input[name=multicolour]').value = 0;
  validate();
});

// $('input.letters').focus();