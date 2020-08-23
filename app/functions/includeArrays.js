const unique = require('./unique')

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
                    newEntity[key].push(entity[key])
                })
        })
    })
    return newEntities
}
module.exports  = includeArrays
