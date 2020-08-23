function unique(arr) {
    let result = [];

    for (let str of arr) {
        if (!result.includes(JSON.stringify(str))) {
            result.push(JSON.stringify(str));
        }
    }
    let result2 =[]
    result.forEach(r => {
        result2.push(JSON.parse(r))
    })
    return result2;
}
module.exports = unique
