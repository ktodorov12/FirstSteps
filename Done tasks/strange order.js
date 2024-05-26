let input = ["3,-12,0,0,13,5,1,0,-2"];

let print = this.print || console.log;
let gets =this.gets ||((arr, index) => () =>arr[index++])(input, 0);

let wholeArray = gets().split(",");
let minusArray = [];
let zeroArray = [];
let plusArray = [];

for (let char of wholeArray){
    if (char < 0){
        minusArray.push(char)
    } else if(char == 0){
        zeroArray.push(char);
    } else if(char > 0){
        plusArray.push(char);
    }
}
let concatenated = minusArray.concat(zeroArray, plusArray);
console.log(concatenated);