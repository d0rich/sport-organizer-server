module.exports = function(app, models, jsonParser) {
    app.post('/createSection', jsonParser, async(req, res) => {
        if (!req.body) return res.sendStatus(400);
        const NewSection = req.body;
        models.User.findOne({ where: { Login: NewSection.CreatorLogin } }).then(user => {
            models.Section.create({
                    Name: NewSection.Name,
                    Description: NewSection.Description,
                    CreatorID: user.ID,
                    SportTypeID: NewSection.Sport_type
                })
                .then(result => {
                    console.log(result.dataValues);
                    res.send(result.dataValues)
                }).catch(err => console.log(err))
        })
    })
}