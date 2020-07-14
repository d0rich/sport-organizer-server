module.exports = function(seq, Seq) {
    return seq.define("Trainer", {}, {
        indexes: [{
            fields: ['GroupID', 'UserID']
        }]
    })
}