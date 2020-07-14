module.exports = function(seq) {
    return seq.define("Users-sport", {}, {
        indexes: [{
            fields: ['SportTypeID', 'UserID']
        }]
    })
}