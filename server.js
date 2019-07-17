const   express = require('express'),
        mongoose = require('mongoose'),
        app = express(),
        port = 3000,
        model = require('./model/model'),
        route = require('./router/router')

mongoose.Promise = global.Promise
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@democluster-qsi9n.gcp.mongodb.net/sensorDB?retryWrites=true&w=majority`, { useNewUrlParser: true, useCreateIndex: true })

app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/'))
app.use(express.json())
route(app)

app.listen(process.env.PORT || port, function() {
    console.log("Berhasil cuy! koneksi ke port " + port, app.settings.env)
})