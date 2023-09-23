let input = ["275", "693",'110','742'];

let print = this.print || console.log;
let gets = this.gets ||((arr, index) => () =>arr[index++])(input, 0);

let end = false;
let sum = 0;

do {
  let number = gets();
  let first = +number[0];
  let second = +number[1];
  let third = +number[2];

  if (first + third === second) {
    sum = sum + Number(number);
  } else {
    end = true;
  }
} while (end === false);

console.log(sum);