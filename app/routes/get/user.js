module.exports = function(app, models) {
    app.get('/user', async(req, res) => {
        const Login = req.param('login')
        const ID = req.param('id')
        if (!Login && !ID) return res.sendStatus(400)
        let detail = {}
        if (Login) detail = { where: { Login: Login } }
        if (ID) detail = { where: { ID: ID } }
        models.User.findOne(detail)
            .then(user => {
                if (user == null) return res.sendStatus(404)
                res.send(user)
            })
            .catch(err => {
                res.send(err)
            })
    })
}