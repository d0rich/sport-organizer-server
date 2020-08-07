module.exports = function(app, models, jsonParser) {
    app.post('/updateGroup', jsonParser, (req, res) => {
        if (!req.body) return res.sendStatus(400)
        const NewInfo = req.body;
        models.Group.findOne({ where: { ID: NewInfo.ID } })
            .then(group => {
                if (!group) return res.sendStatus(404);
                models.Group.update({
                        Name: NewInfo.Name,
                        Description: NewInfo.Description,
                        SectionID: NewInfo.SectionID,
                        AgeTypeID: NewInfo.AgeTypeID
                    }, { where: { ID: group.ID } })
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