let input = ["c,c,a,b,a,a,b,c"];

let print = this.print || console.log;
let gets =this.gets ||((arr, index) => () =>arr[index++])(input, 0);

let elements = gets().split(",");
let final = new Set();

for (let char of elements) {
  final.add(char);
}
let array = Array.from(final);

console.log(array);
