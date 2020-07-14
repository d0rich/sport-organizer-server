module.exports = function(seq, Seq, User) {
    const Gender_type = seq.define("Gender-type", {
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
    })
    Gender_type.hasMany(User)
    return Gender_type
}