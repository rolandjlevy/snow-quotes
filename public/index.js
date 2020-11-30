const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);
const animationEvent =  'onanimationend' in document.documentElement ? 'animationend' : 'webkitAnimationEnd';

const isTag = (str) => /<[^>]*>/g.test(str);
const withinFontFaceSet = (str) => /^[0-9a-zA-Z.]+$/g.test(str);
const maxSnowflakes = 200;

$('input.letters').addEventListener('input', (e) => {
  const input = e.target.value;
  if (isTag(input)) {
    e.target.value = '⚠️';
    return;
  }
  if (!withinFontFaceSet(input)) {
    const str = $('input.letters').value.slice(0,-1);
    e.target.value = str;
    return;
  }
});

$('input.quantity').addEventListener('input', (e) => {
  if (e.target.value > maxSnowflakes) e.target.value = maxSnowflakes;
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
    $('input.hidden.url').value = location.origin + getLink();
  }
}

$('.btn.copy').addEventListener('click', (e) => {
  $('.toast-message').style.animationPlayState = 'running';
  $('.toast-message').classList.remove('none');
  $('input.hidden.url').select();
  document.execCommand('copy');
});

$('.toast-message').addEventListener(animationEvent, (e) => {
  e.currentTarget.classList.add('none');
});

const getLink = () => {
  const letters = encodeURIComponent($('input.letters').value);
  const quantity = encodeURIComponent($('input.quantity').value);
  const colour = encodeURIComponent($('input.colour').value);
  return `/snow?letters=${letters}&quantity=${quantity}&colour=${colour}`;
}

const getLinkEncoded = () => {
  const letters = $('input.letters').value;
  const quantity = $('input.quantity').value;
  const colour = $('input.colour').value;
  const str = location.href + `snow?letters=${letters}&quantity=${quantity}&colour=${colour}`;
  return str;
}

$('input.letters').addEventListener('focus', (e) => {
  const input = e.target.value;
  e.target.value= '';
  e.target.value = input; 
});

function getTinyUrl(longUrl) {
  return new Promise((resolve, reject) => {
    return fetch(longUrl)
    .then(res => res.text())
    .then(data => {
      resolve(data);
    })
    .catch(err => {
      reject(err);
    });
  });
}

$('input.letters').focus();
$('.btn.start').href = getLink();
$('input.hidden.url').value = location.origin + getLink();

// const longUrl = location.href + '/shorten?longurl=' + getLinkEncoded();
// getLink or  getLinkEncoded ?
// console.log({longUrl});
// $('input.hidden.url').value = longUrl;
// getTinyUrl(longUrl)
// .then(result => {
//   console.log({result});
// });
// const trimmed = result.split('https://')[1];