module.exports = function(app, models, jsonParser) {
    app.post('/deleteGroup', jsonParser, (req, res) => {
        if (!req.body) return res.sendStatus(400);
        const GroupID = req.body.ID;
        models.Group.findOne({ where: { ID: GroupID } })
            .then(group => {
                if (!group) return res.sendStatus(404)
                else {
                    models.Group.destroy({ where: { ID: GroupID } })
                        .then(() => {
                            res.sendStatus(404)
                        })
                        .catch(err => {
                            console.error(err)
                            res.sendStatus(500)
                        })
                }
            })
            .catch(err => {
                console.error(err)
                res.sendStatus(500)
            })

    })
}