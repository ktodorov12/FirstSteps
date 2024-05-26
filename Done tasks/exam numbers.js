let input = [300, 400, 4];

let print = this.print || console.log;
let gets = this.gets ||((arr, index) => () =>arr[index++])(input, 0);

let start = +gets();
let end = +gets();
let targetSum = +gets();

for (let i = start; i <= end; i++){
    let sumOfNum = 0;
    i = i.toString()
    for (let nums of i){
        nums = Number(nums);
        sumOfNum += nums;
        }
    if (sumOfNum === targetSum){
            console.log(i);
    }
    i = Number(i);
}


