let input = ['10'];

let print = this.print || console.log;
let gets =this.gets ||((arr, index) => () =>arr[index++])(input, 0);

let evenSum = 0;
let oddSum = 0;
let number = gets();

for (let el of number){
    el = Number(el)
    if (el % 2 === 0){
        evenSum += el
    } else {
        oddSum += el
    }
}

if (evenSum > oddSum){
    console.log(`${evenSum} energy drinks`);
} else if (oddSum > evenSum){
    console.log(`${oddSum} cups of coffee`);
} else {
    console.log(`${evenSum} of both`);
}