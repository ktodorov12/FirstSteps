let input = ['azsumtup',
 3, 'av','vvcxv','moccucomgic'];

let print = this.print || console.log;
let gets =this.gets ||((arr, index) => () =>arr[index++])(input, 0);

let title = gets();
let copy = title;
let lines = +gets();

for (let i = 0; i < lines; i++){
    let word = gets().toLowerCase();
    let indexCurr = 0
    let isFound = true;
    for (let j = 0; j < word.length; j++){
        let curLetter = word[j]
        let indexOfLetter = title.indexOf(curLetter, indexCurr)
        if (indexOfLetter > -1){
            title = title.substring(0, indexOfLetter) + title.substring(indexOfLetter + 1)
            indexCurr = indexOfLetter
        } else {
            isFound = false;
            break;
        }
    }

    if (isFound){
        copy = title;
        console.log(title);
    } else {
        console.log("No such title found!");
        title = copy
    }
}