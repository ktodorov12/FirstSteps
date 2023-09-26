let input = ["anagram",9,"anagram","gramana","aaagrnm","margana",
"aanagram","aaagram", "anagra","anagrama", "yxy"];

let print = this.print || console.log;
let gets =this.gets ||((arr, index) => () =>arr[index++])(input, 0);

let word = gets();
let tries = +gets();
let madeWord = "";

for (let i = 0; i < tries; i++) {
  let attempt = gets();
  if (attempt.length < word.length || attempt.length > word.length) {
    console.log("No");
    continue;
  }
  attempt.search(word);
  if (word) {
    console.log("Yes");
  } else {
    console.log("No");
  }
}