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
            type: Seq.STRING(512),
            allowNull: false
        },
        Salt: {
            type: Seq.STRING(128),
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
        Age: {
            type: Seq.VIRTUAL,
            get() {
                const Now = new Date()
                const NowYear = Now.getFullYear()
                const NowMonth = Now.getMonth()
                const NowDay = Now.getDate()

                const Birthdate = new Date(this.Birthdate)
                const BdYear = Birthdate.getFullYear()
                const BdMonth = Birthdate.getMonth()
                const BdDay = Birthdate.getDate()

                let koeff = 0
                if (BdMonth > NowMonth) koeff = -1
                else {
                    if (BdMonth == NowMonth) {
                        if (BdDay > NowDay) koeff = -1
                    }
                }
                return (NowYear - BdYear + koeff)
            }
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