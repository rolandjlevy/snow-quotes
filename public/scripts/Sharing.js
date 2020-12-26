import Utils from './Utils.js';

export default class Sharing extends Utils {
  constructor(menu, quotes) {
    super();
    this.init();
  }
  test(longUrl) {
    const url = location.origin + '/shorten?longurl=' + longUrl;
    this.getShortUrl(url).then(result => {
      console.log(result);
    });
  }
  init() {
    this.sharingLinks = {
      whatsapp: 'https://wa.me/?text=Check+out+the+Snow+Quotes+app+by+@rolandjlevy+-+',
      facebook: 'https://www.facebook.com/sharer/sharer.php?text=Check+out+the+Snow+Quotes+app+by+@rolandjlevy&u=',
      twitter: 'https://twitter.com/intent/tweet?hashtags=node,express,pug,javascript,css&text=Check+out+the+Snow+Quotes+app+by+@rolandjlevy+-&url='
    }
    this.longUrl = location.origin + '/shorten?longurl=' + location.origin;
    this.getShortUrl(this.longUrl).then(url => {
      $('input.hidden.url').value = url;
      $('.btn.whatsapp').href = this.sharingLinks['whatsapp'] + url;
      $('.btn.twitter').href = this.sharingLinks['twitter'] + url;
      $('.btn.facebook').href = this.sharingLinks['facebook'] + url;
    });
    this.$('.btn.start').href = this.getQueryString();
  }
  getQueryString() {
    const letters = encodeURIComponent(this.$('input.letters').value);
    const quantity = encodeURIComponent(this.$('input.quantity').value);
    const colour = encodeURIComponent(this.$('input.colour').value);
    const multicolour = encodeURIComponent(this.$('input[name=multicolour]').value);
    const str = `/snow?letters=${letters}&quantity=${quantity}&colour=${colour}&multicolour=${multicolour}`;
    return str;
  }
  getShortUrl(url) {
    return new Promise((resolve, reject) => {
      return fetch(url)
      .then(res => res.text())
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
    });
  }
}