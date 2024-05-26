let input = [5, 1, 2, 3, 1, 2];

let print = this.print || console.log;
let gets =this.gets ||((arr, index) => () =>arr[index++])(input, 0);

let spins = +gets();
let array = [];

for (let i = 0; i < spins; i++) {
  let numbers = +gets();
  array.push(numbers);
}
array.sort();
let count = 0;
let num = 0;
let currentCount = 0;

if (array.length > 1) {
  for (let j = 0; j <= array.length; j++) {
    currentCount++;
    let nextNum = array[j + 1];
    let prevNum = array[j];
    if (prevNum !== nextNum) {
      currentCount = 0;
    }
    if (currentCount > count) {
      count = currentCount;
      num = prevNum;
    }
  }
} else {
  num = array[0];
}
console.log(num);
