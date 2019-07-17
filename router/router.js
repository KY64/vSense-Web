module.exports = function(app) {
    const model = require('../controller/controller')
    
    app
        .route("/")
        .get(model.mainPage)
    app
        .route("/login")
        .get(model.loginPage)
        .post(model.userAuth)
    app
        .route("/login/user")
        .get(model.listUser)
        .delete(model.deleteUsers)
    app
        .route("/data")
        .get(model.daftarSensor)
        .post(model.tambahSensor)
        .delete(model.hapusSemua)
    
    app
        .route("/data/:sensor")
        .get(model.pilihSensor)
        .put(model.ubahSensor)
        .delete(model.hapusSensor)
}