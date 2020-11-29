const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

let tooltipOn = false;

$$('.snowflake').forEach(item => {
  item.addEventListener('mouseenter', (e) => {
    if (!tooltipOn) {
      const pos = Number(e.target.id) || parseInt(e.target.id);
      const { text, author } = quotes[pos];
      const quote = `<span class="quote">${text}</span>` + (author ? ` ${author}` : '');
      $('.tooltip').innerHTML = quote;
      $('.tooltip').classList.add('active');
      tooltipOn = true;
      e.currentTarget.style.animationPlayState = 'paused';
      e.currentTarget.style.opacity = 1;
    }
  });
  item.addEventListener('mouseleave', (e) => {
    tooltipOn = false;
    $('.tooltip').classList.remove('active');
    e.currentTarget.style.animationPlayState = 'running';
    e.currentTarget.style.opacity = getVar(e.currentTarget, '--opacity');
  });
});

const getVar = (elem, varName) => {
  return getComputedStyle(elem).getPropertyValue(varName).trim();
}

const setVar = (elem, varNaquotesApiUrlme, value) => {
  elem.style.setProperty(varName, value);
}

const fetchQuotes = () => {
  return new Promise((resolve, reject) => {
    return fetch(quotesApiUrl)
    .then(res => res.json())
    .then(data => {
      const quotes = filteredQuotes(data);
      resolve(quotes);
    });
  });
}

const filteredQuotes = (arr) => {
  const ignoreList = ['trump', 'dalai'];
  return arr.reduce((acc, item) => {
    const ignore = item.author && item.author.split(' ').some(word => ignoreList.includes(word.toLowerCase()));
    if (ignore == false) {
      acc.push(item);
    }
    return acc;
  }, []);
}

let quotes;
fetchQuotes().then(result => {
  quotes = result;
});