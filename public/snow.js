const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

const quotesApiUrl = 'https://type.fit/api/quotes';

let tooltipOn = false;

$$('.snowflake').forEach(item => {
  item.addEventListener('mouseenter', (e) => {
    if (!tooltipOn) {
      getQuote(e.target.id).then(result => {
        $('.tooltip').textContent = result;
        $('.tooltip').classList.add('active');
      });
      tooltipOn = true;
    }
    e.currentTarget.style.animationPlayState = 'paused';
  });
  item.addEventListener('mouseleave', (e) => {
    tooltipOn = false;
    $('.tooltip').classList.remove('active');
    e.currentTarget.style.animationPlayState = 'running';
  });
});

const getQuote = (id) => {
  return new Promise((resolve, reject) => {
    return fetch(quotesApiUrl)
      .then(res => res.json())
      .then(data => {
        const pos = Number(id);
        const { text, author } = filteredData(data)[pos];
        const quote = `"${text}"` + (author ? ` ${author}` : '');
        resolve(quote);
      });
  });
}

// getQuote(e.target.id).then(result => {
//   $('.tooltip').textContent = result;
//   $('.tooltip').classList.add('active');
// });

const filteredData = (arr) => {
  return arr.reduce((acc, item) => {
    if (item.author && item.author.toLowerCase().includes('dalai') == false) {
      acc.push(item);
    }
    return acc;
  }, []);
}