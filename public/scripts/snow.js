let tooltipOn = false;
let darkMode = true;

import Quotes from './Quotes.js';
const quotesObject = new Quotes();

let quotes;
quotesObject.fetchQuotes().then(result => quotes = result);

const darkModeTextColour = getVar($('body'), '--dark-mode-text-colour');
const darkModeTextHoverColour = getVar($('body'), '--dark-mode-text-hover-colour');
const darkModeBgColour = getVar($('body'), '--dark-mode-bg-colour');
const lightModeTextColour = getVar($('body'), '--light-mode-text-colour');
const lightModeTextHoverColour = getVar($('body'), '--light-mode-text-hover-colour');
const lightModeBgColour = getVar($('body'), '--light-mode-bg-colour');

const insideMenu = (elem) => {
  const { top, left, width, height } = elem.getBoundingClientRect();
  const menuBottom = $('.menu .content').getBoundingClientRect().bottom;
  const menuRight = $('.menu .content').getBoundingClientRect().right;
  return top + height/2 < menuBottom && left + width/2 < menuRight;
}

$$('.snowflake').forEach(item => {
  // Show quotes
  item.addEventListener('mouseenter', (e) => {
    if (!tooltipOn && !insideMenu(item)) {
      const pos = Number(e.currentTarget.id) || parseInt(e.currentTarget.id);
      const author = quotes[pos] && !!quotes[pos].author ? ` ${quotes[pos].author}` : '';
      const quote = `<span class="quote">${quotes[pos].text}</span>${author}`;
      $('.tooltip').innerHTML = quote;
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
    if (mobileView || insideMenu(item)) return;
    const id = Number(e.currentTarget.id);
    const {text, author } = quotes[id];
    $('.toast-message').style.animationPlayState = 'running';
    $('.toast-message').classList.remove('none');
    $('input.hidden.quote-text').value = `"${text}" by ${author}`;
    $('input.hidden.quote-text').select();
    document.execCommand('copy');
  });
  // Toggle font on keypress
  $('body').addEventListener('keypress', (e) => {
    const spaceKeyCode = 32;
    if (e.keyCode == spaceKeyCode) item.classList.toggle('abc');
  });
});

// Reset toast message for settings copied
$('.toast-message').addEventListener(animationEvent, (e) => {
  e.currentTarget.classList.add('none');
});

// Menu icons
$$('.content .menu-icon > i').forEach(item => {
  item.addEventListener('click', (e) => e.preventDefault());
});

$('.content .menu-icon > i#font').addEventListener('click', (e) => {
  $$('.snowflake').forEach(item => item.classList.toggle('abc'));
});

$('.content .menu-icon > i#home').addEventListener('click', (e) => {
  location.href = '/';
});

$('.content .menu-icon > i#mode').addEventListener('click', (e) => {
  const getColours = toggleColourMode();
  setVar($('body'), '--mode-text-colour', getColours.text);
  setVar($('body'), '--mode-text-hover-colour', getColours.textHover);
  setVar($('body'), '--mode-bg-colour', getColours.bg);
});

const toggleColourMode = () => {
  darkMode = !darkMode;
  return { 
    text: darkMode ? darkModeTextColour : lightModeTextColour, 
    textHover: darkMode ? darkModeTextHoverColour : lightModeTextHoverColour, 
    bg: darkMode ? darkModeBgColour : lightModeBgColour
  };
}