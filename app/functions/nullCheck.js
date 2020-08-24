function nullCheck (entity) {
    let isNull = true
    entity = new Object(entity)
    for(let key in entity)
    {
        if (entity[key] instanceof Object ) {
            if (nullCheck(entity[key]) !== null) isNull = false
        }
        else {
            if (entity[key] !== null) isNull = false
        }
    }
    if (isNull) return null
    else return entity
}
module.exports  = nullCheck
