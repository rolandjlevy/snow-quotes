const $ = selector => document.querySelector(selector);

const isTag = (str) => /<[^>]*>/g.test(str);

$('input.letters').addEventListener('input', (e) => {
  const input = e.target.value;
  if (isTag(input)) {
    e.target.value = '⚠️';
    $('div.display').textContent = 'error';
    return;
  }
  $('div.display').textContent = e.target.value;
});
