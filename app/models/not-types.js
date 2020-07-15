module.exports = function(seq, Seq) {
    return seq.define("Not-type", {
        ID: {
            type: Seq.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        Name: {
            type: Seq.STRING(50),
            allowNull: false
        }
    }, {
        indexes: [{
            name: 'Not-typeId_index',
            using: 'BTREE',
            fields: ['ID']
        }]
    })
}