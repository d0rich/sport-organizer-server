module.exports = function(app, sequelize) {
    app.get('/notifications/get/all/byEvent', (req, res) => {
        const ID = req.param('eventID')
        let query = `select distinct N."ID" as "N.ID", N."Comment" as "N.Comment",N."createdAt" as "N.createdAt",
        N."updatedAt" as "N.updatedAt",N."NotTypeID" as "N.NotTypeID",
        N."EventID" as "N.EventID",N."UserID" as "N.UserID",
        "Not-types"."ID" as "Not-types.ID","Not-types"."Name" as "Not-types.Name",
        "Users"."ID" as "Users.ID","Users"."Login" as "Users.Login",
        "Users"."Name" as "Users.Name","Users"."Surname" as "Users.Surname",
        "Events"."ID" as "Events.ID","Events"."Name" as "Events.Name","Events"."TimeRange" as "Events.TimeRange"
        from "Events"
        inner join "Notifications" N on "Events"."ID" = N."EventID"
        inner join  "Users" on N."UserID" = "Users"."ID"
        inner join "Not-types" on N."NotTypeID" = "Not-types"."ID"
        where "Events"."ID"='${ID}'
        order by "N.updatedAt" desc`
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