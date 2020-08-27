module.exports = function(app, models, jsonParser) {
    app.post('/sections/create', jsonParser, (req, res) => {
        if (!req.body) return res.sendStatus(400);
        if (!req.body.Name) return res.sendStatus(400);
        if (!req.body.CreatorID) return res.sendStatus(400);
        if (!req.body.SportTypeID) return res.sendStatus(400);
        const NewSection = req.body;
        models.Section.create({
                Name: NewSection.Name,
                Description: NewSection.Description,
                UserID: NewSection.CreatorID,
                SportTypeID: NewSection.SportTypeID
            })
            .then(result => {
                console.log(result.dataValues)
                models.NewsNote.create({
                        Header: "HelloWorld!",
                        Text: "You did it! Have a nice day ;)",
                        SectionID: result.dataValues.ID,
                        UserID: result.dataValues.UserID
                    })
                    .then(news => {
                        console.log(news.dataValues);
                        res.sendStatus(200)
                    })
                    .catch(err => {
                        console.error(err)
                        res.sendStatus(500)
                    })
            }).catch(err => {
                console.error(err)
                res.sendStatus(500)
            })
    })
}