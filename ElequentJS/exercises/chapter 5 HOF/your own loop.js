function loop(value, testFunc, updateFunc, bodyFunc) {
  //   for (value; testFunc(value); value = updateFunc(value)) {
  //     bodyFunc(value);
  //   }

  if (!testFunc(value)) {
    return false;
  }
  else {
    bodyFunc(value)
    value = updateFunc(value)
    return loop(value, testFunc, updateFunc, bodyFunc)
  }
}

loop(
  3,
  (n) => n > 0,
  (n) => n - 1,
  console.log
);
