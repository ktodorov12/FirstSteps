let input = [3, "macaroni", "kiufte", "banica"];

let print = this.print || console.log;
let gets =this.gets ||((arr, index) => () =>arr[index++])(input, 0);

const vowels = "aiueo";
let line = +gets();
let bestFood = 1;
let chosenWord = "";
let rate = 0;
// let previous;

for (let i = 0; i < line; i++) {
  let vowelsCount = 0;
  let ratio = 0;
  let food = gets();
  //vowels in word check;
  for (let sign of food) {
    for (let vow of vowels) {
      if (sign === vow) {
        vowelsCount++;
      }
    }
  }
  //ratio check;
  ratio = vowelsCount / food.length;
  if (ratio === 0) {
    break;
  }
  if (ratio < bestFood) {
    bestFood = ratio;
    chosenWord = food;
    rate = vowelsCount;
    //additional check
  }
  if (ratio === bestFood) {
    if (rate < vowelsCount) {
      chosenWord = food;
      rate = vowelsCount;
    }
  } else if (ratio === bestFood && rate === vowelsCount) {
    if (chosenWord.length < food.length) {
      chosenWord = food;
      rate = vowelsCount;
    }
  }
}
if (rate > 0){
  console.log(`${chosenWord} ${rate}/${chosenWord.length}`);
}

