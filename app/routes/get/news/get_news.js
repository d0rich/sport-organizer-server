module.exports = function(app, models) {
    app.get('/news-notes/get', (req, res) => {
        const ID = req.param('newsID')
        console.log(ID)
        if (!ID) return res.sendStatus(400)
        models.NewsNote.findOne({
                where: { ID: ID },
                include: [
                    { model: models.User, attributes: ['ID', 'Login', 'Name', 'Surname'] },
                    {
                        model: models.Section,
                        attributes: ['ID', 'Name', 'SportTypeID'],
                        include: [{ model: models.Sport_type, attributes: ['ID', 'Name'] }]
                    },
                    { model: models.Event, attributes: ['ID', 'Name', 'Description', 'TimeRange', 'EventTypeID'] }
                ]
            })
            .then(news => {
                if (news == null) return res.sendStatus(404)
                res.send(news)
            })
            .catch(err => {
                console.error(err)
                res.sendStatus(500)
            })
    })
}