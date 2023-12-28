function deepEqual(first, second) {
  let isObj = typeof first != "object" || typeof second != "object";
  let isNull = first == null || second == null;

  if (first === second) return true;
  if (isObj && isNull) return false;

  let firstKeys = Object.keys(first);
  let secondKeys = Object.keys(second);

  if (firstKeys.length !== secondKeys.length) return false;

  for (let key of firstKeys) {
    let includes = secondKeys.includes(key);
    if (!includes) return false;
    return deepEqual(first[key], second[key]);
  }
  return true;
}

let obj = { here: { is: "an" }, object: 2 };
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, { here: 1, object: 2 }));
// → false
console.log(deepEqual(obj, { here: { is: "an" }, object: 2 }));
// → true
console.log(
  deepEqual(obj, { here: { is: "an", obj: { another: 2 } }, object: 2 })
);
