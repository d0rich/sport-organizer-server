module.exports = function(seq, Seq) {
    return seq.define("User", {
        ID: {
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
        PhoneNumber: {
            type: Seq.STRING(50),
            allowNull: true
        },
        Email: {
            type: Seq.STRING(200),
            allowNull: false,
            isEmail: true
        },
        ActivateCode: {
            type: Seq.STRING(50),
            allowNull: true
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
            allowNull: false,
            isDate: true
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
                fields: ['ID']
            },
            {
                unique: true,
                fields: ['Login']
            }
        ]
    })
}