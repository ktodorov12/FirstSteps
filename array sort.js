let input = ["0,1,0,3,12"];

let print = this.print || console.log;
let gets =this.gets ||((arr, index) => () =>arr[index++])(input, 0);

let numbers = gets().split(",");
let zeroes = [];
let newArr = [];

for (let char of numbers){
    if (char == 0){
        zeroes.push(char);
    } else if(char != 0){
        newArr.push(char)
    }
}
console.log(newArr.concat(zeroes));