module.exports = function(seq, Seq) {
    return seq.define("InviteTrainer", {}, {
        indexes: [{
            fields: ['GroupID', 'UserID']
        }]
    })
}