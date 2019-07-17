const   mongoose = require('mongoose'),
        Joi = require('@hapi/joi'),
        sha256 = require('crypto-js/sha256'),
        sensor = mongoose.model("sensor"),
        user = mongoose.model("user")

const validator = (data) => {
    let schema = Joi.object().keys({
        sensorName: Joi.string(),
        value: Joi.number(),
        name: Joi.string().regex(/^[A-Z][a-z]+(\s[A-Z][a-z]+)*/).min(2),
        email: Joi.string().email(),
        password: Joi.string().min(6),
        address: Joi.string().alphanum().min(6),
        phone: Joi.string().regex(/^(\+628|08)[0-9]{8,13}/)
    }).with("sensorName","value")
      .with("email","password")
      .with("name",["email","password","address","phone"])

    return schema.validate(data)
}

const localTime = () => {
    let time = new Date()
    return time.toString()
}

exports.mainPage = function(req,res) {
    res.sendFile("index.html", {root: "/media/ky/DATA/PENS/Project/INNOVATE 2019/vSense-Web"})
}

exports.loginPage = function(req,res) {
    res.sendFile("/views/login.html", {root: "/media/ky/DATA/PENS/Project/INNOVATE 2019/vSense-Web"})
}

exports.addUser = function (req,res) {

    req.body.password = sha256(req.body.password)

    var addUser = new user(req.body)
    addUser.save(function(err,user) {
        if(err) res.send(err)
        res.json(user)
    })
}

exports.listUser = function (req,res) {
    user.find({}, function(err,user){
        if(err) res.send(err)
        res.json(user)
    })
}

exports.userAuth = function(req,res) {

    let {error} = validator(req.body)

    if(error){
        res.send(error.details[0].message)
        return;
    }

    user.findOne({email: req.body.email, password: `${sha256(req.body.password)}`},function(err, user) {
        if(err) res.send(err)
        else if(user == null) {res.send("Email or password does not match");return;}
        res.json(user)
    })
}

exports.deleteUsers = function(req,res) {
    user.deleteMany({}, function(err,user){
        if(err) res.send(err)
        res.json(user)
    })
}

exports.daftarSensor = function(req,res) {
    sensor.find({}, function(err, sensor) {
        if(err) res.send(err)
        res.json(sensor)
    }).sort({time: -1})
}

exports.tambahSensor = function(req,res) {

    let {error} = validator(req.query)
    
    if(error) {
        res.send(error.details[0].message)
        return;
    }

    req.query.time = localTime()

    var menuBaru = new sensor(req.query)
    menuBaru.save(function(err, sensor) {
        if(err) res.send(err)
        res.json(sensor)
    })
    
}

exports.pilihSensor = function(req,res) {
    sensor.find({sensorName : req.params.sensor}, function(err,sensor) {
        if(err) res.send(err)
        res.json(sensor)
    }).sort({time: -1})
}

exports.ubahSensor = function(req,res) {
    sensor.findOneAndUpdate({ _id: req.params.sensorId }, req.body,
        { new: true }, function(err, sensor) {
            if(err) res.send(err)
            res.json(sensor)
    })
}

exports.hapusSensor = function(req,res) {
    sensor.deleteOne({_id : req.params.sensor}, function(err, sensor) {
        if(err) res.send(err)
        res.json(sensor)
    })
}

exports.hapusSemua = function(req,res) {
    sensor.deleteMany({}, function(err, sensor) {
        if(err) res.send(err)
        res.json(sensor)
    })
}
