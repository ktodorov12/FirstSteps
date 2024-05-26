let input = [123.45];

let print = this.print || console.log;
let gets =this.gets ||((arr, index) => () =>arr[index++])(input, 0);

let number = gets();

number = number.split('').reverse().join("");
console.log(number);