let input = ["3,-12,0,0,13,5,1,0,-2"];

let print = this.print || console.log;
let gets =this.gets ||((arr, index) => () =>arr[index++])(input, 0);

let numbers = gets().split(",");
let above = [];
let below = [];
let sum = 0;

numbers.forEach(element => sum += Number(element));
let average = sum / numbers.length;


for (let i = 0; i < numbers.length; i++){
    if (numbers[i] > average){
        above.push(numbers[i]);
    } else if(numbers[i] < average){
        below.push(numbers[i])
    }
}

console.log(`avg: ${average.toFixed(2)}`);
console.log(`below: ${below}`);
console.log(`above: ${above}`);