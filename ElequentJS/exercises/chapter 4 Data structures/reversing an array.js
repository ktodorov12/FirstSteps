function reverseArray(arr) {
  let newArr = [];
  for (let i = arr.length - 1; i >= 0; i--) newArr.push(arr[i]);
  return newArr;
}
function reverseArrayInPlace(arr) {
  let length = Math.floor(arr.length / 2);
  for (let i = 0; i < length; i++) {
    let old = arr[i];
    arr[i] = arr[arr.length - 1 - i];
    arr[arr.length - 1 - i] = old;
  }
}

let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
