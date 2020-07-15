module.exports = function(seq) {
    return seq.define("Events-Group", {}, {
        indexes: [{
            fields: ['EventID', 'GroupID']
        }]
    })
}