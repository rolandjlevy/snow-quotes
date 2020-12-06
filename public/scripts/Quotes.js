export default class Quotes {
  constructor() {
    this.fetchQuotes().then(result => this.list = result);
  }
  // Fetching from quotes API
  fetchQuotes() {
    return new Promise((resolve, reject) => {
      return fetch(quotesApiUrl)
      .then(res => res.json())
      .then(data => {
        const quotes = this.filteredQuotes(data);
        resolve(quotes);
      });
    });
  }
  shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
  }
  // Filter out words in ignoreList
  filteredQuotes = (arr) => {
    const ignoreList = ['tenzin', 'trump', 'dalai', 'yeshe', 'eckhart', 'baba', 'sogyal'];
    const filtered = arr.reduce((acc, item) => {
      const ignore = item.author && item.author.split(' ').some(word => ignoreList.includes(word.toLowerCase()));
      if (ignore == false) {
        acc.push(item);
      }
      return acc;
    }, []);
    return this.shuffle(filtered);
  }
}