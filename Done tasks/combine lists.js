let input = [[2,3,1,],[5,2,3]];

let print = this.print || console.log;
let gets = this.gets ||((arr, index) => () =>arr[index++])(input, 0);

let firstArray = gets().split(',');
let secondArray = gets().split(',');;
let concatenated = [];

for (let i = 0; i < firstArray.length; i++){
    concatenated.push(firstArray[i], secondArray[i])
}

console.log(concatenated);