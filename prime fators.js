let input = ["100"];

let print = this.print || console.log;
let gets = this.gets ||((arr, index) => () =>arr[index++])(input, 0);

let number = +gets();
let factorial = 0;

for (let i = 2; i <= number; i++){
    if (number % i === 0){
        while(number % i ===0){
        console.log(i);
        number = number / i
        }
    }
}