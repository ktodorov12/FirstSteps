let input = ['-7231'];

let print = this.print || console.log;
let gets = this.gets || ((arr, index) => () =>arr[index++])(input, 0);

let digit = gets();

do{
  let sum = 0;

for (let i = 0; i < digit.length; i++) {
  let num = +digit[i];
  if (isNaN(num)){
    continue;
  }
  sum += num
}
digit = sum.toString();
} while (digit.length > 1);

console.log(digit);