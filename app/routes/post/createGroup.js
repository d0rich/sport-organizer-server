module.exports = function(app, models, jsonParser) {
    app.post('/createGroup', jsonParser, async(req, res) => {
        if (!req.body) return res.sendStatus(400);
        const NewGroup = req.body;
        models.Section.findOne({ where: { Name: NewGroup.SectionName } }).then(section => {
            models.Group.create({
                    Name: NewGroup.Name,
                    Description: NewGroup.Description,
                    SectionID: section.ID,
                    AgeTypeID: NewGroup.Age_type
                })
                .then(result => {
                    console.log(result.dataValues);
                    res.send(result.dataValues)
                }).catch(err => console.log(err))
        })
    })
}