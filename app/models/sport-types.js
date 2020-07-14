module.exports = function(seq, Seq) {
    return seq.define("Sport-type", {
        ID: {
            type: Seq.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        Sport_type_Name: {
            type: Seq.STRING(50),
            allowNull: false
        }
    }, {
        indexes: [{
            name: 'Sport-typeId_index',
            using: 'BTREE',
            fields: ['ID']
        }]
    })
}