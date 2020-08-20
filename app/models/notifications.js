module.exports = function(seq, Seq) {
    return seq.define("Notification", {
        ID: {
            type: Seq.UUID,
            defaultValue: Seq.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        Comment: {
            type: Seq.TEXT,
            allowNull: false
        }
    }, {
        indexes: [{
            name: 'NotificationId_index',
            using: 'BTREE',
            fields: ['ID']
        }]
    })
}