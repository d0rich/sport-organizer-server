module.exports = function(app, models, jsonParser) {
    app.post('/deleteAT', jsonParser, (req, res) => {
        if (!req.body) return res.sendStatus(400);
        const ATypeID = req.body.ID;
        models.Age_type.findOne({ where: { ID: ATypeID } })
            .then(atype => {
                if (!atype) return res.sendStatus(404)
                else {
                    models.Age_type.destroy({ where: { ID: ATypeID } })
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