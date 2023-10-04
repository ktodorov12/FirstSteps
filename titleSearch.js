let input = ['peshoishere', 3, 'eho','piere','telerik'];

let print = this.print || console.log;
let gets =this.gets ||((arr, index) => () =>arr[index++])(input, 0);

let title = gets();
let lines = +gets();
let count = 0
title = Array.from(title)

for (let i = 0; i < lines; i++){
    let word = gets().toLowerCase();
    let removed = ''

    for (let j = 0; j < word.length; j++){
        let search = title.includes(word[i])

        if (search){
            count++
        }
    }

    if (count === word.length){
        
        
        for (let j = 0; j < word.length; j++){
            for (let x = 0; x < title.length; x++){
                if (word[j] === title[x]){
                    title.splice(x, 1)
                    break;
                }
            }
        }
    } else {
        console.log("No such title found!");
        continue;
    }

    count = 0;
    console.log(title.join(''));
}
