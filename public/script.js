const $ = selector => document.querySelector(selector);

$('input.letters').addEventListener('input', (e) => {
  $('div.display').textContent = e.target.value;
});