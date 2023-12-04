function areArraysSame(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  let isTrue = true;

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] != arr2[i]) {
      isTrue = false;
      break;
    }
  }

  return isTrue;
}

console.log(areArraysSame([1, 2, 3], [4, 5, 6]));
console.log(areArraysSame([1, 2, 3], [1, 2, 3]));
console.log(areArraysSame([1, 2, 3], [1, 2, 3, 4]));
