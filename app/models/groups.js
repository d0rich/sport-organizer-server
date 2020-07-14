module.exports = function(seq, Seq) {
    return seq.define("Group", {
        ID: {
            type: Seq.UUID,
            defaultValue: Seq.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        Name: {
            type: Seq.STRING(50),
            allowNull: false
        },
        Description: {
            type: Seq.TEXT,
            allowNull: true
        }
    }, {
        indexes: [{
            name: 'GroupId_index',
            using: 'BTREE',
            fields: ['ID']
        }]
    })
}