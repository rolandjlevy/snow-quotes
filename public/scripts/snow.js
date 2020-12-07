let tooltipOn = false;

import Quotes from './Quotes.js';
const quotes = new Quotes();

import Menu from './Menu.js';
const menu = new Menu();

import Toast from './Toast.js';
const toast = new Toast(menu, quotes);

$$('.snowflake').forEach(item => {
  // Show quotes
  item.addEventListener('mouseenter', (e) => {
    if (!tooltipOn && !menu.inside(item)) {
      const pos = Number(e.currentTarget.id) || parseInt(e.currentTarget.id);
      const q = quotes.list[pos];
      const author = q && !!q.author ? ` ${q.author}` : '';
      const quoteHtml = `<span class="quote">${q.text}</span>${author}`;
      $('.tooltip').innerHTML = quoteHtml;
      $('.tooltip').classList.add('active');
      tooltipOn = true;
      e.currentTarget.style.animationPlayState = 'paused';
      e.currentTarget.style.opacity = 1;
      e.currentTarget.classList.add('hover');
    }
  });
  // Hide quote
  item.addEventListener('mouseleave', (e) => {
    tooltipOn = false;
    $('.tooltip').classList.remove('active');
    e.currentTarget.style.animationPlayState = 'running';
    e.currentTarget.style.opacity = getVar(e.currentTarget, '--opacity');
    e.currentTarget.classList.remove('hover');
  });
  // Trigger toast message when clicking on a snowflake
  item.addEventListener('click', (e) => {
    toast.triggerMessage(item, e);
  });
});