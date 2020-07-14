module.exports = function(seq, Seq) {
    return seq.define("Section", {
        ID: {
            type: Seq.UUID,
            defaultValue: Seq.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        Name: {
            type: Seq.STRING(50),
            allowNull: false,
            unique: true
        },
        Description: {
            type: Seq.STRING,
            allowNull: false
        }
    }, {
        indexes: [{
            name: 'sectionId_index',
            using: 'BTREE',
            fields: ['ID']
        }]
    })
}