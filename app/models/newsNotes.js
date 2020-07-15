module.exports = function(seq, Seq) {
    return seq.define("NewsNote", {
        ID: {
            type: Seq.UUID,
            defaultValue: Seq.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        Header: {
            type: Seq.STRING(100),
            allowNull: false
        },
        Text: {
            type: Seq.TEXT,
            allowNull: false
        },
        Time: {
            type: Seq.DATE,
            allowNull: false
        }
    }, {
        indexes: [{
            name: 'NewsNoteId_index',
            using: 'BTREE',
            fields: ['ID']
        }]
    })
}