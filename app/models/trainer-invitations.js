module.exports = function(seq, Seq) {
    return seq.define("Trainer_Invitation", {

    }, {
        indexes: [{
            name: '_index',
            using: 'BTREE',
            fields: ['GroupID', 'UserID']
        }]
    })
}