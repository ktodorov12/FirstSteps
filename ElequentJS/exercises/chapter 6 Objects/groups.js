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
        return this.group.includes(val)
    }

    static from(object) {
        debugger
        const group = new Group();
        for (let val of object) {
            group.add(val);
        }

        return group;
    }
}

let group = Group.from([10, 20]);
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));
// → false