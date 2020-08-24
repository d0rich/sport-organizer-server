module.exports = function(app, sequelize) {
    app.get('/notifications/get/all/byTrainer', (req, res) => {
        const ID = req.param('userID')
        let query = `select distinct N."ID" as "N.ID", N."Comment" as "N.Comment",N."createdAt" as "N.createdAt",
        N."updatedAt" as "N.updatedAt",N."NotTypeID" as "N.NotTypeID",
        N."EventID" as "N.EventID",N."UserID" as "N.UserID",
        "Not-types"."ID" as "Not-types.ID","Not-types"."Name" as "Not-types.Name",
        "Trainer"."ID" as "Trainer.ID","Trainer"."Login" as "Trainer.Login",
        "Trainer"."Name" as "Trainer.Name","Trainer"."Surname" as "Trainer.Surname",
        E."ID" as "E.ID",E."Name" as "E.Name",E."TimeRange" as "E.TimeRange"
        from "Users" as "Trainer"
        inner join "Trainers" on "Trainer"."ID" = "Trainers"."UserID"
        inner join "Groups" G on G."ID" = "Trainers"."GroupID"
        inner join "Events-Groups" "E-G" on G."ID" = "E-G"."GroupID"
        inner join "Events" E on "E-G"."EventID" = E."ID"
        inner join "Notifications" N on E."ID" = N."EventID"
        inner join "Users" on N."UserID"="Users"."ID"
        inner join "Not-types" on N."NotTypeID" = "Not-types"."ID"
        where "Trainer"."ID"='${ID}'
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