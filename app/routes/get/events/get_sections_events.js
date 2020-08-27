module.exports = function(app, sequelize) {
    app.get('/events/get/bySections', (req, res) => {
        const ID = req.param('sectionID')
        const StartDate = req.param('date')
        const EndDate = new Date(StartDate).setMilliseconds(24 * 60 * 60 * 1000).toISOString()
        let query = `select distinct 
        "Events"."ID","Events"."Name","Events"."TimeRange",
        "Event-types"."ID" as "Event-type.ID" ,"Event-types"."Name" as "Event-type.Name",
        "Groups"."ID" as "Group.ID"
        from "Events"
        inner join "Event-types" on "Events"."EventTypeID" = "Event-types"."ID" 
        inner join "Events-Groups" on "Events"."ID" = "Events-Groups"."EventID"
        inner join "Groups" on "Events-Groups"."GroupID" = "Groups"."ID"
        inner join "Sections" on "Groups"."SectionID" = "Sections"."ID"
        where "Sections"."ID"='${ID}'
        and (lower("Events"."TimeRange") < '${EndDate}') and (upper("Events"."TimeRange")>'${StartDate}')`
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