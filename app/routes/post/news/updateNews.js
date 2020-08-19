module.exports = function(app, models, jsonParser) {
    app.post('/news-notes/update', jsonParser, (req, res) => {
        if (!req.body) return res.sendStatus(400)
        const NewInfo = req.body;
        models.NewsNote.findOne({ where: { ID: NewInfo.ID } })
            .then(news => {
                if (!news) return res.sendStatus(404);
                models.NewsNote.update({
                        Header: NewInfo.Header,
                        Text: NewInfo.Text,
                        SectionID: NewInfo.SectionID,
                        EventID: NewInfo.EventID
                    }, { where: { ID: news.ID } })
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