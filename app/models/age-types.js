module.exports = function(seq, Seq) {
    return seq.define("Age-type", {
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
        Age_range: {
            type: Seq.RANGE(Seq.INTEGER),
            allowNull: false
        }

    }, {
        indexes: [{
            name: 'ageTypesId_index',
            using: 'BTREE',
            fields: ['ID']
        }]
    })
}