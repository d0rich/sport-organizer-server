module.exports = function(app, models) {
    app.get('/get_group', (req, res) => {
        const ID = req.param('groupID')
        console.log(ID)
        if (!ID) return res.sendStatus(400)
        let detail = {}
        if (ID) detail = { ID: ID }
        models.Group.findOne({
                where: detail,
                include: [
                    { model: models.Section, attributes: ['ID', 'Name', 'UserID'], include: [{ model: models.Sport_type, attributes: ['ID', 'Name'] }] },
                    { model: models.User, as: 'Trainers', attributes: ['ID', 'Login', 'Name', 'Surname'], through: { model: models.Trainer, attributes: [] } },
                    { model: models.User, as: 'Trainees', attributes: ['ID', 'Login', 'Name', 'Surname'], through: { model: models.Trainee, attributes: [] } },
                    { model: models.NewsNote, attributes: ['ID', 'Header', 'Text', 'Time'] },
                    { model: models.Event, as: 'GroupEvents', attributes: ['ID', 'Name', 'Description', 'TimeRange'], through: { model: models.Event_Group, attributes: [] } }
                ]
            })
            .then(group => {
                if (group == null) return res.sendStatus(404)
                res.send(group)
            })
            .catch(err => {
                console.error(err)
                res.sendStatus(500)
            })
    })
}