let arrays = [[1, 2, 3], [4, 5], [6]];
let flattening = (arr) =>
  arr.reduce((currEl, flatter) => currEl.concat(flatter), []);
console.log(flattening(arrays));
