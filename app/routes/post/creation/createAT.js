module.exports = function(app, models, jsonParser) {
    app.post('/createAT', jsonParser, (req, res) => {
        if (!req.body) return res.sendStatus(400);
        if (!req.body.Name) return res.sendStatus(400);
        if (!req.body.SA) return res.sendStatus(400);
        if (!req.body.EA) return res.sendStatus(400);
        if (!req.body.UserID) return res.sendStatus(400);
        const NewAgeType = req.body;
        models.Age_type.create({
                Name: NewAgeType.Name,
                Age_range: [NewAgeType.SA, NewAgeType.EA],
                UserID: NewAgeType.UserID
            })
            .then(result => {
                console.log(result.dataValues);
                res.send(result.dataValues)
            }).catch(err => {
                console.error(err)
                res.sendStatus(500)
            })
    })
}