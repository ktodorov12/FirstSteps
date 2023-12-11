// let dog = {
//   name: "Pancake",
//   legs: 4,
//   age: 6,
// };

// dog.bark = function () {
//      console.log(`Woof Woof ! My name is ${this.name}`);
// };

// dog.bark();
//____________________________________________________________________

function speak() {
  console.log(`My name is ${this.name} and my age is ${this.age}`);
}

let allAnimals = {
  cat: {
    name: "Masha",
    age: "8",
  },
  dog: {
    name: "Mecho",
    age: 14,
  },
  pig: {
    name: "Pigglet",
    age: 3,
  },
  horse: {
    name: "Vihar",
    age: 14,
  },
};

for (let animals in allAnimals) {
  let currAnimal = allAnimals[animals]
  currAnimal.speak = speak;
  currAnimal.speak()
}
