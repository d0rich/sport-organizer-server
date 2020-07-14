module.exports = function(seq, Seq, User) {
    return seq.define("Gender-type", {
        ID: {
            type: Seq.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        Gender_type_Name: {
            type: Seq.STRING(50),
            allowNull: false
        }
    }, {
        indexes: [{
            name: 'Gender-typeId_index',
            using: 'BTREE',
            fields: ['ID']
        }]
    })
}