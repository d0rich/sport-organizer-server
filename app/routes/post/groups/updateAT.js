module.exports = function(app, models, jsonParser) {
    app.post('/updateAT', jsonParser, (req, res) => {
        if (!req.body) return res.sendStatus(400)
        const NewInfo = req.body;
        models.Age_type.findOne({ where: { ID: NewInfo.ID } })
            .then(atype => {
                if (!atype) return res.sendStatus(404);
                models.Age_type.update({
                        Name: NewInfo.Name,
                        Age_range: [NewInfo.SA, NewInfo.EA]
                    }, { where: { ID: atype.ID } })
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