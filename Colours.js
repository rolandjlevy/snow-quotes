module.exports = class Colours {
  constructor() {
    this.hexChars = [];
    this.base = 16;
    this.initHexChars();
  }
  initHexChars() {
    let counter = 0;
    while (++counter < this.base) {
      let char = counter.toString(this.base);
      this.hexChars.push(char);
    }
  }
  randomHexString() {
    let result = '#';
    let counter = 0;
    while (++counter <= 6) {
      const n = Math.round(Math.random() * (this.hexChars.length-1));
      result += this.hexChars[n];
    }
    return result;
  }
}