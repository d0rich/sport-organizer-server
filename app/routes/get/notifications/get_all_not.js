module.exports = function(app, sequelize) {
    app.get('/notifications/get/all/byTrainer', (req, res) => {
        const ID = req.param('userID')
        let query = `select distinct N."ID", N."Comment", N."createdAt",
        N."updatedAt", N."NotTypeID", N."EventID", N."UserID",
        "Not-types"."ID" as "Not-type.ID","Not-types"."Name" as "Not-type.Name",
        "Users"."ID" as "User.ID","Users"."Login" as "User.Login",
        "Users"."Name" as "User.Name","Users"."Surname" as "User.Surname",
        E."ID" as "Event.ID",E."Name" as "Event.Name",E."TimeRange" as "Event.TimeRange"
        from "Users" as "Trainer"
        inner join "Trainers" on "Trainer"."ID" = "Trainers"."UserID"
        inner join "Groups" G on G."ID" = "Trainers"."GroupID"
        inner join "Events-Groups" "E-G" on G."ID" = "E-G"."GroupID"
        inner join "Events" E on "E-G"."EventID" = E."ID"
        inner join "Notifications" N on E."ID" = N."EventID"
        inner join "Users" on N."UserID"="Users"."ID"
        inner join "Not-types" on N."NotTypeID" = "Not-types"."ID"
        where "Trainer"."ID"='${ID}'
        order by N."updatedAt" desc`
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