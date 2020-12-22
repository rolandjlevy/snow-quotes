const isTag = (str) => /<[^>]*>/g.test(str);
const withinFontFaceSet = (str) => /^[0-9a-zA-Z.]+$/g.test(str);

import Sharing from './Sharing.js';
const sharing = new Sharing();

import Toast from './Toast.js';
const toast = new Toast();
toast.init();

// Validate all input fields
$$('input').forEach(item => {
  item.addEventListener('input', (e) => validate());
});

// Validate
const validate = () => {
  let errors = 0;
  errors += $('input.letters').value ? 0 : 1;
  errors += $('input.quantity').value > 0 ? 0 : 1;
  if (errors > 0) {
    toggleButtons('add');
    return;
  }
  toggleButtons('remove');
  $('.btn.start').href = sharing.getQueryString();
  $('input.hidden.url').value = location.origin + sharing.getQueryString();
}

// Toggle disabled state of all buttons
const toggleButtons = (action) => {
  $$('.btn, input.colour').forEach(item => {
    item.classList[action]('disabled');
  });
}

// Validate input for letters (a-z and 0-9)
$('input.letters').addEventListener('input', (e) => {
  const input = e.target.value;
  $('.display-text').textContent = input;
  if (isTag(input)) {
    e.target.value = '⚠️';
    return;
  }
  if (!withinFontFaceSet(input)) {
    const str = $('input.letters').value.slice(0,-1);
    $('.display-text').textContent = str;
    e.target.value = str;
    return;
  }
});

// Set the caret to the end of letters
$('input.letters').addEventListener('focus', (e) => {
  const input = e.target.value;
  e.target.value= '';
  e.target.value = input;
});

// Validate quantity input
$('input.quantity').addEventListener('input', (e) => {
  const { value, max } = e.target;
  const [ nValue, nMax ] = [Number(value), Number(max)];
  if (nValue > nMax) e.target.value = nMax;
  if (nValue < 1) e.target.value = '';
});

// Turn multicolour on
$('.btn.multicolour').addEventListener('click', (e) => {
  $('.colour-group.colour').classList.remove('active');
  $('.colour-group.multicolour').classList.add('active');
  $('input[name=multicolour]').value = 1;
  validate();
});

// Turn colour on
$('input.colour').addEventListener('click', (e) => {
  $('.colour-group.colour').classList.add('active');
  $('.colour-group.multicolour').classList.remove('active');
  $('input[name=multicolour]').value = 0;
  validate();
});

// $('input.letters').focus();