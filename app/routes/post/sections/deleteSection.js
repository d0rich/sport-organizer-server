module.exports = function(app, models, jsonParser) {
    app.post('/deleteSection', jsonParser, (req, res) => {
        if (!req.body) return res.sendStatus(400);
        const SectionID = req.body.ID;
        models.Section.findOne({ where: { ID: SectionID } })
            .then(section => {
                if (!section) return res.sendStatus(404)
                else {
                    models.Section.destroy({ where: { ID: SectionID } })
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