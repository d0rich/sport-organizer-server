module.exports = function(seq, Seq) {
    return seq.define("Trainee", {}, {
        indexes: [{
            fields: ['GroupID', 'UserID']
        }]
    })
}