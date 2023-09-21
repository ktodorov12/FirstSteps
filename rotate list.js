let input = [
    '2,1,3,4', 
    '3',
];
 
let print = this.print || console.log;
let gets = this.gets || ((arr, index) => () => arr[index++])(input, 0);
 
let array = gets().split(',');
let rotations = gets();

for (let i = 0; i < rotations; i++){
    let firstElement = array.shift();
    array.push(firstElement);
}

console.log(array);