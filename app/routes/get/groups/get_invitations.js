module.exports = function(app, models) {
    app.get('/get_invitations', (req, res) => {
        const GroupID = req.param('GroupID')
        console.log(GroupID)
        if (!GroupID) return res.sendStatus(400)
        models.Invitation.findAll({
                where: { GroupID: GroupID }
            })
            .then(code => {
                if (code == null) return res.sendStatus(404)
                res.send(code)
            })
            .catch(err => {
                console.error(err)
                res.sendStatus(500)
            })
    })
}