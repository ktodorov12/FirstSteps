let input = ["DU"];

let print = this.print || console.log;
let gets =this.gets ||((arr, index) => () => arr[index++])(input, 0);

let command = gets().split("");
let xAxis = 0;
let yAxis = 0;

for (let i = 0; i < command.length; i++) {
  switch (command[i]) {
    case "U":
      yAxis++;
      break;
    case "D":
      yAxis--;
      break;
    case "L":
      xAxis--;
      break;
    case "R":
      xAxis++;
      break;
  }
}
console.log("(" + xAxis + "," + yAxis + ")");
