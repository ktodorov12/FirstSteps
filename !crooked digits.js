let input = [1012919201902741904102947190247179024901n];

let print = this.print || console.log;
let gets = this.gets || ((arr, index) => () =>arr[index++])(input, 0);

let digit = parseFloat(gets());
digit = Math.abs(digit);
digit = digit.toString().split(".").join("");
let sum = 0;
let newSum = 0;


for (let i = 0; i < digit.length; i++) {
  sum += parseFloat(digit[i]);
}
while (sum > 9) {
  sum = sum.toString();
  newSum = 0;
  for (let j = 0; j < sum.length; j++) {
    newSum += parseFloat(sum[j]);
  }
  sum = newSum;
}

console.log(sum);
