module.exports = function(seq, Seq) {
    return seq.define("Event", {
        ID: {
            type: Seq.UUID,
            defaultValue: Seq.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        Name: {
            type: Seq.STRING(100),
            allowNull: false
        },
        Description: {
            type: Seq.TEXT,
            allowNull: true
        },
        TimeRange: {
            type: Seq.RANGE(Seq.DATE),
            allowNull: false
        },
        Timed: {
            type: Seq.BOOLEAN,
            defaultValue: true,
            allowNull: false
        }
    }, {
        indexes: [{
            name: 'eventId_index',
            using: 'BTREE',
            fields: ['ID']
        }]
    })
}