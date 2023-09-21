let input = [
    "3",
    "-1,-1,1,1,4,5",
    "1,2,8,9,9",
    "1,2,2,3,2"
];

let print = this.print || console.log;
let gets =this.gets ||((arr, index) => () =>arr[index++])(input, 0);

let spins = gets();

for (let i = 0; i < spins; i++) {
  let arrays = gets().split(",");
  let isSorted = true;
  let element = arrays.shift();
  for (let chars of arrays) {
    if (element <= chars) {
      element = chars;
    } else if (element > chars) {
      isSorted = false;
      break;
    }
  }
  if (isSorted) {
    console.log("true");
  } else if (isSorted === false) {
    console.log("false");
  }
}
