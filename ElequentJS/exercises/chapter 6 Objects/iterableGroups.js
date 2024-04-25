class Group {
  group = [];

  add(val) {
    this.group.includes(val) ? "" : this.group.push(val);
  }

  delete(val) {
    const index = this.group.indexOf(val);
    index !== -1 ? this.group.splice(index, 1) : "";
  }

  has(val) {
    return this.group.includes(val);
  }

  static from(object) {
    const group = new Group();
    for (let val of object) {
      group.add(val);
    }

    return group;
  }

  [Symbol.iterator]() {
    return new GroupIterator(this.group);
  }
}

class GroupIterator {
  constructor(group) {
    this.index = 0;
    this.group = group;
  }

  next() {
    if (this.index === this.group.length) {
      return { done: true };
    }

    let value = this.group[this.index];
    this.index++;

    return { value, done: false };
  }
}

for (let value of Group.from(["a", "b", "c"])) {
  console.log(value);
}
