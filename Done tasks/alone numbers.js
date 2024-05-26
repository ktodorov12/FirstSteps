let input = [[7, 5, 6], 1];

let print = this.print || console.log;
let gets =this.gets ||((arr, index) => () =>arr[index++])(input, 0);

let array = gets();
let target = +gets();

for (let j = target - 1; j < array.length - 1; j += target) {
  let nextNum = array[j + 1];
  let prevNum = array[j - 1];

  if (array[j] !== nextNum && array[j] !== prevNum && j !== 0) {
    if (array[j] < nextNum) {
      array[j] = nextNum;
    }
    if (array[j] < prevNum) {
      array[j] = prevNum;
    }
  }
}

console.log(`[${array}]`);
