let input = [[2, 4],[1, 2, 3, 4],];

let print = this.print || console.log;
let gets =this.gets ||((arr, index) => () =>arr[index++])(input, 0);

let firstArray = gets().split(",").map(Number);
let secondArray = gets().split(",").map(Number);
let newArray = [];

for (let i = 0; i < firstArray.length; i++) {
  let ind = secondArray.indexOf(firstArray[i]);

  for (let j = ind; j < secondArray.length; j++) {
    if (secondArray[j] > firstArray[i]) {
      newArray.push(secondArray[j]);
      break;
    } else if (j + 1 === secondArray.length) {
      newArray.push(-1);
    }
  }
}
console.log(newArray.join(","));
