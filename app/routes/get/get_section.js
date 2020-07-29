module.exports = function(app, models) {
    app.get('/get_section', async(req, res) => {
        const ID = req.param('id')
        console.log(ID)
        if (!ID) return res.sendStatus(400)
        let detail = {}
        if (ID) detail = { ID: ID }
        models.Section.findOne({
                where: detail,
                include: [
                    { model: models.User, attributes: ['ID', 'Login', 'Name', 'Surname'] },
                    { model: models.Group, attributes: ['ID', 'Name'] }
                ]
            })
            .then(section => {
                if (section == null) return res.sendStatus(404)
                res.send(section)
            })
            .catch(err => {
                console.log(err)
                res.sendStatus(500)
            })
    })
}