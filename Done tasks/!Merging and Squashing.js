let input = ['2','44','69'];

let print = this.print || console.log;
let gets = this.gets ||((arr, index) => () =>arr[index++])(input, 0);

let merged = '';
let squashed = '';
let lines = +gets();
let ab = gets();

for (let i = 1; i < lines; i++){
    let cd = gets();
    let mergeSequence = ab[1] + cd[0];
    let squasheSequence = ab[0] + (+ab[1] + +cd[0]) % 10 + cd[1];
    merged += ' ' + mergeSequence;
    squashed += ' ' + squasheSequence;

    ab = cd;
}

console.log(merged);
console.log(squashed);