const hexChars = [];

const generateHexChars = () => {
  const base = 16;
  let counter = 0;
  while (counter < base) {
    let char = counter.toString(base);
    hexChars.push(char);
    counter++;
  }
}
generateHexChars();

const randomHexString = () => {
  let result = '#';
  let counter = 0;
  while (++counter <= 6) {
    const n = Math.round(Math.random() * (hexChars.length-1));
    result += hexChars[n];
  }
  return result;
}

module.exports = {
  hexChars,
  randomHexString
}