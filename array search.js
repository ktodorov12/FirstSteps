let input = ["1,3,3,3,5"];

let print = this.print || console.log;
let gets =this.gets ||((arr, index) => () =>arr[index++])(input, 0);

let array = gets().split(",").map(Number);
let alone = [];

for (let j = 1; j <= array.length;j++){
    let isTrue = false;
        if (array.includes(j)){
            isTrue = true;
        } else if (isTrue == false){
            alone.push(j);
        }
}

console.log(alone);