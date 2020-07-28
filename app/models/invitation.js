module.exports = function(seq, Seq) {
    return seq.define("Invitation", {
        Code: {
            type: Seq.UUID,
            defaultValue: Seq.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        EntranceNum: {
            type: Seq.INTEGER,
            allowNull: false
        }
    }, {
        indexes: [{
            name: 'CodeId_index',
            using: 'BTREE',
            fields: ['Code']
        }]
    })
}