function isEven(n) {
  if (n == 0) {
    return true;
  } else if (n == 1) {
    return false;
  } else {
    return n < 0 ? (isEven(-n)) : (n = isEven(n - 2));
  }
}

console.log(isEven(-50));
