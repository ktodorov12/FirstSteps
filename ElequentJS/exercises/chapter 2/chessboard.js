// let size = 8;
// let chessBoard = "";
// let startSign = " ";
// let nextSign = "#";

// for (let i = 0; i < size; i++) {
//   for (let j = 0; j < size; j++) {
//     if (j % 2 === 0) chessBoard += startSign;
//     if (j % 2 !== 0) chessBoard += nextSign;

//     if (j + 1 === size) {
//       chessBoard += "\n";
//       let subsitution = startSign;
//       startSign = nextSign;
//       nextSign = subsitution;
//     }
//   }
// }
// console.log(chessBoard);
function multiplier(factor) {
    return number => number * factor;
    }
    let twice = multiplier(2);
    console.log(twice(20));