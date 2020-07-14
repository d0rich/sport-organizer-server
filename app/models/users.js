module.exports = function(seq, Seq) {
    const User = seq.define("User", {
        User_ID: {
            type: Seq.UUID,
            defaultValue: Seq.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        Login: {
            type: Seq.STRING(50),
            allowNull: false,
            unique: true
        },
        Password: {
            type: Seq.STRING(300),
            allowNull: false
        },
        Salt: {
            type: Seq.STRING(100),
            allowNull: false
        },
        Name: {
            type: Seq.STRING(100),
            allowNull: false
        },
        Surname: {
            type: Seq.STRING(100),
            allowNull: false
        },
        Birthdate: {
            type: Seq.DATEONLY,
            allowNull: false
        },
        Height: {
            type: Seq.REAL,
            allowNull: true
        },
        Weight: {
            type: Seq.REAL,
            allowNull: true
        }

    }, {
        indexes: [{
                name: 'userId_index',
                using: 'BTREE',
                fields: ['User_ID']
            },
            {
                unique: true,
                fields: ['Login']
            }
        ]
    })
    return User
}