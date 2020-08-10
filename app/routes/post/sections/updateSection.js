module.exports = function(app, models, jsonParser) {
    app.post('/sections/update', jsonParser, (req, res) => {
        if (!req.body) return res.sendStatus(400)
        const NewInfo = req.body;
        models.Section.findOne({ where: { ID: NewInfo.ID } })
            .then(section => {
                if (!section) return res.sendStatus(404);
                models.Section.update({
                        Name: NewInfo.Name,
                        Description: NewInfo.Description,
                        SportTypeID: NewInfo.SportTypeID
                    }, { where: { ID: section.ID } })
                    .then(result => {
                        console.log(result);
                        res.send(result)
                    }).catch(err => {
                        console.error(err)
                        res.sendStatus(500)
                    })
            })
            .catch(err => {
                console.error(err)
                res.sendStatus(500)
            })
    })
}