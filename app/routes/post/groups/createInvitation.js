module.exports = function(app, models, jsonParser) {
    app.post('/createInvitation', jsonParser, (req, res) => {
        if (!req.body) return res.sendStatus(400);
        const NewInvitation = req.body;
        models.Invitation.create({
                EntranceNum: NewInvitation.EntranceNum,
                GroupID: NewInvitation.GroupID
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