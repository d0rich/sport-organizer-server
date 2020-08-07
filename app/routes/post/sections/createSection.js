module.exports = function(app, models, jsonParser) {
    app.post('/createSection', jsonParser, (req, res) => {
        if (!req.body) return res.sendStatus(400);
        const NewSection = req.body;
        models.Section.create({
                Name: NewSection.Name,
                Description: NewSection.Description,
                UserID: NewSection.CreatorID,
                SportTypeID: NewSection.SportTypeID
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