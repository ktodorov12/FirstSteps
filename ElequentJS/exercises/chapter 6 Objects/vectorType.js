class Vec {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    plus(vector) {
        return new Vec(this.x + vector.x, this.y + vector.y)
    }

    minus(vector) {
        return new Vec(this.x - vector.x, this.y - vector.y)
    }
}

const left = new Vec(1, 2);
const right = new Vec(2, 3); 
console.log(left.plus(right));