module.exports = function(app, sequelize) {
    app.get('/events/get/bySections', (req, res) => {
        const ID = req.param('sectionID')
        const StartDate = req.param('date')
        const EndDate = new Date(StartDate).setMilliseconds(24*60*60*1000).toISOString()
        let query = `select distinct N."ID" as "Notification.ID",
        N."Comment" as "Notification.Comment",N."createdAt" as "Notification.createdAt",
        N."updatedAt" as "Notification.updatedAt",N."NotTypeID" as "Notification.NotTypeID",
        N."EventID" as "Notification.EventID",N."UserID" as "Notification.UserID",
        "Not-types"."ID" as "Not-type.ID","Not-types"."Name" as "Not-type.Name",
        "Users"."ID" as "User.ID","Users"."Login" as "User.Login",
        "Users"."Name" as "User.Name","Users"."Surname" as "User.Surname",
        "Events"."ID","Events"."Name","Events"."TimeRange"
        from "Events"
        inner join "Events-Groups" on "Events"."ID" = "Events-Groups"."EventID"
        inner join "Groups" on "Events-Groups"."GroupID" = "Groups"."ID"
        inner join "Sections" on "Groups"."SectionID" = "Sections"."ID"
        inner join "Notifications" N on "Events"."ID" = N."EventID"
        inner join  "Users" on N."UserID" = "Users"."ID"
        inner join "Not-types" on N."NotTypeID" = "Not-types"."ID"
        where "Sections"."ID"='${ID}'
        and ('${Date}' between date(lower("Events"."TimeRange")) and date(upper("Events"."TimeRange")))`
        sequelize.query(query, {
                type: sequelize.QueryTypes.SELECT,
                nest: true
            })
            .then(events => {
                res.send(events)
            })
            .catch(err => {
                console.error(err)
                res.sendStatus(500)
            })
    })
}
