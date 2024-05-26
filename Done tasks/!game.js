let input = ['111'];

let print = this.print || console.log;
let gets = this.gets ||((arr, index) => () =>arr[index++])(input, 0);

let gameNum = gets();

for (let i = 0; i < 1; i++){
    let sum = +gameNum[0] + +gameNum[1] + +gameNum[2];
    let multy = +gameNum[0] * +gameNum[1] * +gameNum[2];
    let one = +gameNum[0] * +gameNum[1] + +gameNum[2];
    let two = +gameNum[0] + +gameNum[1] * +gameNum[2];
    console.log(Math.max(sum, multy, one, two))
} 

