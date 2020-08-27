module.exports = function(app, sequelize) {
    app.get('/events/get/bySections', (req, res) => {
        const ID = req.param('sectionID')
        const Date = JSON.parse(req.param('date'))
        let query = `select distinct N."ID", N."Comment", N."createdAt",
        N."updatedAt", N."NotTypeID", N."EventID", N."UserID",
        "Not-types"."ID" as "Not-type.ID","Not-types"."Name" as "Not-type.Name",
        "Users"."ID" as "User.ID","Users"."Login" as "User.Login",
        "Users"."Name" as "User.Name","Users"."Surname" as "User.Surname",
        "Events"."ID" as "Event.ID","Events"."Name" as "Event.Name","Events"."TimeRange" as "Event.TimeRange"
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
