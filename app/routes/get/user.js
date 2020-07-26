module.exports = function(app, models) {
    app.get('/user', async(req, res) => {
        const Login = req.param('login')
        if (!Login) return res.sendStatus(400)
        models.User.findOne({ where: { Login: Login } })
            .then(user => {
                if (user == null) return res.sendStatus(404)
                res.send(user)
            })
            .catch(err => {
                res.send(err)
            })
    })
}