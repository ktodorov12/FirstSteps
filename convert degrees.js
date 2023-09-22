let input = [0, 15, 30];

let print = this.print || console.log;
let gets =this.gets ||((arr, index) => () =>arr[index++])(input, 0);

let array = gets().split(" ");

for (let char of array){
    char = char * 9/5 + 32;
    console.log(Math.round(char));
}
