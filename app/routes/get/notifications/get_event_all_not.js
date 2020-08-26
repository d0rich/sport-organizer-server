module.exports = function(app, sequelize) {
    app.get('/notifications/get/all/byEvent', (req, res) => {
        const ID = req.param('eventID')
        let query = `select distinct N."ID" as "Notification.ID",
        N."Comment" as "Notification.Comment",N."createdAt" as "Notification.createdAt",
        N."updatedAt" as "Notification.updatedAt",N."NotTypeID" as "Notification.NotTypeID",
        N."EventID" as "Notification.EventID",N."UserID" as "Notification.UserID",
        "Not-types"."ID" as "Not-type.ID","Not-types"."Name" as "Not-type.Name",
        "Users"."ID" as "User.ID","Users"."Login" as "User.Login",
        "Users"."Name" as "User.Name","Users"."Surname" as "User.Surname",
        "Events"."ID","Events"."Name","Events"."TimeRange"
        from "Events"
        inner join "Notifications" N on "Events"."ID" = N."EventID"
        inner join  "Users" on N."UserID" = "Users"."ID"
        inner join "Not-types" on N."NotTypeID" = "Not-types"."ID"
        where "Events"."ID"='${ID}'
        order by "Notification.updatedAt" desc`
        sequelize.query(query, {
                type: sequelize.QueryTypes.SELECT,
                nest: true
            })
            .then(notifications => {
                res.send(notifications)
            })
            .catch(err => {
                console.error(err)
                res.sendStatus(500)
            })
    })
}