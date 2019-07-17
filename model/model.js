const   mongoose = require('mongoose'),
        Schema = mongoose.Schema

const localTime = () => {
    let time = new Date()
    return time.toString()
}

const sensor = new Schema({
    sensorName : {
        type: String,
        required: "Required name",
        minlength: 2
    },
    value : {
        type: Number,
        immutable: true,
        required : "Undefined value",
        default : 0
    },
    status : {
        type: String,
        enum: ["Critical", "Warning", "Stable"],
        default: "Stable"
    },
    time : {
        type: String,
        immutable: true,
        required: true,
        default : localTime()
    }    
} , { collection: 'dataSensor'}
)

const user = new Schema({
    email : {
        type: String,
        unique: true,
        required : "Please register Email",
        minlength: 6
    },
    password : {
        type: String,
        required: "Please add password",
        minlength: 6
    },
    // name : {
    //     type: String,
    //     required: "Name required",
    //     minlength: 2
    // },
    // phone : {
    //     type: Number,
    //     unique: true,
    //     required : "Please input phone number",
    //     minlength: 6
    // },
    // address : {
    //     type: String,
    //     required: "Please add address",
    //     minlength: 6
    // }
} , { collection: 'user'}
)

module.exports = mongoose.model("sensor", sensor)
module.exports = mongoose.model("user", user)