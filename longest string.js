let input = ["END"];

let print = this.print || console.log;
let gets = this.gets ||((arr, index) => () =>arr[index++])(input, 0);

let finish = false;
let longestWord = '';

while(finish === false){
    let word = gets();
    if (word === "END"){
        finish = true;
        break;
    }
    if (word.length >= longestWord.length){
        longestWord = word;  
    }
}
console.log(longestWord);