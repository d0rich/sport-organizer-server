module.exports = function(app, db, models) {
    app.get('/sections/get', (req, res) => {
        const ID = req.param('sectionID')
        console.log(ID)
        if (!ID) return res.sendStatus(400)
        let detail = {}
        if (ID) detail = { ID: ID }
        models.Section.findOne({
                where: detail,
                include: [
                    { model: models.User, attributes: ['ID', 'Login', 'Name', 'Surname'] },
                    {
                        model: models.Group,
                        attributes: ['ID', 'Name']
                    },
                    { model: models.Sport_type, attributes: ['ID', 'Name'] },
                ]
            })
            .then(section => {
                if (section == null) return res.sendStatus(404)
                db.query(
                    `select distinct U."ID", U."Name", U."Surname"
                    from "Sections" inner join "Groups" G on "Sections"."ID" = G."SectionID"
                    inner join "Trainers" T on G."ID" = T."GroupID"
                    inner join "Users" U on T."UserID" = U."ID"
                    where "Sections"."ID" = '${ID}'`, {
                        type: db.QueryTypes.SELECT
                    })
                    .then( trainers => {
                        section.dataValues.Trainers = trainers
                        console.log(section.dataValues)
                        res.send(section)
                    })
                    .catch(err => {
                        console.error(err)
                        res.sendStatus(500)
                    })

            })
            .catch(err => {
                console.error(err)
                res.sendStatus(500)
            })
    })
}