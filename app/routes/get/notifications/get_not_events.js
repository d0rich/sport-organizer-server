const includeArrays = require('../../../functions/includeArrays')
module.exports = function(app, sequelize) {
    app.get('/notifications/get/byGroup', (req, res) => {
        const Groups = JSON.parse(req.param('groups'))
        const LT = JSON.parse(req.param('LowTime'))
        const UT = JSON.parse(req.param('UpTime'))
        console.log(Groups[0])
        let query = `select distinct "Events"."ID",
        "Notifications"."ID" as "Notifications.ID", "Notifications"."Comment" as "Notifications.Comment"
        from "Events"
        inner join "Notifications" on "Events"."ID" = "Notifications"."EventID"
        inner join "Events-Groups" on "Events"."ID" = "Events-Groups"."EventID"
        inner join "Groups" as "Groups" on "Events-Groups"."GroupID" = "Groups"."ID"
        inner join "Event-types" on "Events"."EventTypeID" = "Event-types"."ID" 
        where ("Groups"."ID" = '${Groups[0]}'`
        Groups.shift()
        Groups.forEach(groupID => {
            query += ` or "Groups"."ID" = '${groupID}'`
        });
        query += `) and (lower("Events"."TimeRange") < '${UT}') and (upper("Events"."TimeRange")>'${LT}')`
        sequelize.query(query, {
                type: sequelize.QueryTypes.SELECT,
                nest: true
            })
            .then(groups => {
                console.log(includeArrays(groups, ['Notifications']))
                res.send(includeArrays(groups, ['Notifications']))
            })
            .catch(err => {
                console.error(err)
                res.sendStatus(500)
            })

    })
}
