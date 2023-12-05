function doHomework() {
  console.log("Do your homework");
}

let timeoutID = setTimeout(doHomework, 600);
clearTimeout(timeoutID);

let counter = 5;
function print() {
  console.log(`You have been staring at your console for ${counter} seconds`);
  counter += 5;
}
let minutes = 0;
let hours = 0;
let intervalID = setInterval(print, 5000);

clearInterval(intervalID);
