let input = ["3", "3", "1", "2"];

let print = this.print || console.log;
let gets =
  this.gets ||
  (
    (arr, index) => () =>
      arr[index++]
  )(input, 0);

  let number = +gets();
  let first = Number.MIN_SAFE_INTEGER;
  let second = Number.MIN_SAFE_INTEGER;
  let third = Number.MIN_SAFE_INTEGER;
  
  for (let i = 0; i < number; i++) {
    let num = +gets();
    if (first <= num) {
      third = second;
      second = first;
      first = num;
    } else if (second <= num) {
      third = second;
      second = num;
    } else if (third <= num) {
      third = num;
    }
  }
  
  console.log(`${first}, ${second} and ${third}`);

