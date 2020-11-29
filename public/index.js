const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

const isTag = (str) => /<[^>]*>/g.test(str);

$('input.letters').addEventListener('input', (e) => {
  const input = e.target.value;
  if (isTag(input)) {
    e.target.value = '⚠️';
    $('div.display').textContent = 'error';
    return;
  }
  validate();
  // $('div.display').textContent = e.target.value;
});

$('input.letters').focus();

$('input.quantity').addEventListener('input', (e) => {
  if (e.target.value > 500) e.target.value = 500;
  if (e.target.value < 1) e.target.value = 1;
  validate();
});

const validate = () => {
  const validForm = {
    letters: $('input.letters').value || null,
    quantity: $('input.quantity').value || null
  }
  const errors = Object.values(validForm).filter(n => n);
  $('.btn').disabled = errors.length < 2;
}

$('.btn').addEventListener('click', (e) => {
  e.preventDefault();
  const letters = encodeURIComponent($('input.letters').value);
  const quantity = encodeURIComponent($('input.quantity').value);
  const colour = encodeURIComponent($('input.colour').value);
  const url = `/snow?letters=${letters}&quantity=${quantity}&colour=${colour}`;
  const link = `<a href="${url}">Load Snow Quotes</a>`;
  $('.link').innerHTML = link;
});

