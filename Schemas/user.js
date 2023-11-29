const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: String,
    email: { type: String, unique: true },
    password:String

})
userSchema.methods.comparePassword= async function(userPassword){
    return await bcrypt.compare(userPassword, this.password)
}
module.exports = mongoose.model('Users', userSchema)