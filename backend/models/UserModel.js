const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")


const userSchema = mongoose.Schema({
    username : {type : String,required : true},
    email : {type : String,required : true},
    password : {type : String,required:false},
    operator:{type : String,default:"user"},
    profilePic:{type:String,required:false}
})

const UserModel = mongoose.model("userData2",userSchema)

module.exports = {
    UserModel
}