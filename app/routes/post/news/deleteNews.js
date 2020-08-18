module.exports = function(app, models, jsonParser) {
    app.post('/news-notes/delete', jsonParser, (req, res) => {
        if (!req.body) return res.sendStatus(400);
        const NewsID = req.body.ID;
        models.NewsNote.findOne({ where: { ID: NewsID } })
            .then(news => {
                if (!news) return res.sendStatus(404)
                else {
                    models.NewsNote.destroy({ where: { ID: NewsID } })
                        .then(() => {
                            res.sendStatus(404)
                        })
                        .catch(err => {
                            console.error(err)
                            res.sendStatus(500)
                        })
                }
            })
            .catch(err => {
                console.error(err)
                res.sendStatus(500)
            })

    })
}