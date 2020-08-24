const unique = require('./unique')
const nullCheck = require('./nullCheck')
function includeArrays (entities, keys) {
    let newEntities = []
    entities.forEach(e=>{
        newEntities.push(JSON.parse(JSON.stringify(e)))
    })
    keys.forEach(key =>{
        newEntities.forEach(newEntity =>{
            newEntity[key] = []
        })
        newEntities = unique(newEntities)
        newEntities.forEach(newEntity =>{
            entities
                .filter(entity => entity.ID === newEntity.ID)
                .forEach(entity => {
                    if (nullCheck(entity[key]) !== null)
                    newEntity[key].push(entity[key])
                })
        })
    })
    return newEntities
}
module.exports  = includeArrays
