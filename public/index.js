const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

const isTag = (str) => /<[^>]*>/g.test(str);
const inFontSet = (str) => /^[0-9a-zA-Z.]+$/g.test(str);

$('input.letters').addEventListener('input', (e) => {
  const input = e.target.value;
  if (isTag(input)) {
    e.target.value = '⚠️';
    return;
  }
  if (!inFontSet(input)) {
    const str = $('input.letters').value.slice(0,-1);
    e.target.value = str;
    return;
  }
});

$('input.quantity').addEventListener('input', (e) => {
  if (e.target.value > 250) e.target.value = 250;
  if (e.target.value < 1) e.target.value = '';
});

$$('input').forEach(item => {
  item.addEventListener('input', (e) => validate());
});

const validate = () => {
  const validForm = {
    letters: $('input.letters').value || null,
    quantity: $('input.quantity').value || null
  }
  const valid = Object.values(validForm).filter(n => n);
  if (valid.length < 2) {
    $('.btn.start').classList.add('disabled');
    $('.btn.copy').classList.add('disabled');
  } else {
    $('.btn.start').classList.remove('disabled');
    $('.btn.copy').classList.remove('disabled');
    $('.btn.start').href = getLink();
    $('input.hidden').value = location.href.slice(0, -1) + getLink();
  }
}

const getLink = () => {
  const letters = encodeURIComponent($('input.letters').value);
  const quantity = encodeURIComponent($('input.quantity').value);
  const colour = encodeURIComponent($('input.colour').value);
  return `/snow?letters=${letters}&quantity=${quantity}&colour=${colour}`;
}

$('input.letters').addEventListener('focus', (e) => {
  const input = e.target.value;
  e.target.value= '';
  e.target.value = input; 
});

document.querySelector('.btn.copy').addEventListener('click', (e) => {
  const copyText = document.querySelector('input.hidden');
  copyText.select();
  document.execCommand('copy');
});

$('input.letters').focus();
$('.btn.start').href = getLink();
$('input.hidden').value = location.href.slice(0, -1) + getLink();