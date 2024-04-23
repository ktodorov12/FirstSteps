const SCRIPTS = require("./05_higher_order/code/scripts");

function characterCount(script) {
    return script.ranges.reduce((count, [from, to]) => {
        return count + (to - from)
    }, 0)
}

console.log(SCRIPTS.reduce((a, b) => {
    debugger
    const resA = characterCount(a)
    const resB = characterCount(b)
    return resA < resB ? b : a
}))