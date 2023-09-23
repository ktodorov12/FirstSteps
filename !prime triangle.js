let input = [10];

let print = this.print || console.log;
let gets =
  this.gets ||
  (
    (arr, index) => () =>
      arr[index++]
  )(input, 0);

let number = +gets();
let line = "";

for (let i = 1; i <= number; i++) {
  let sqrt = Math.sqrt(i);
  let isPrime = true;

  for (let j = 2; j <= sqrt; j++) {
    if (i % j === 0) {
      isPrime = 0;
    }
  }
  let printDigit = isPrime ? "1" : "0";
  line += printDigit;

  if (isPrime) {
    console.log(line);
  }
}
