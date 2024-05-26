let input = ["anagram",9,"anagram","gramana","aaagrnm","margana",
"aanagram","aaagram", "anagra","anagrama", "yxy"];;

let print = this.print || console.log;
let gets =this.gets ||((arr, index) => () =>arr[index++])(input, 0);

let word = gets();
let tries = +gets();

for (let i = 0; i < tries; i++) {
  let attempt = gets()
  let isAnagram = true;
  if (attempt.length !== word.length) {
    isAnagram = false;
  } else {
  for (let j = 0; j < word.length; j++){
    if (word[j] !== attempt[j]){
      isAnagram = false;
      break;
    }
  }
  if (isAnagram) {
    console.log("Yes");
  } else {
    console.log("No");
  }
}
}

