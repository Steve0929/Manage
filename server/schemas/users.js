const mongoose = require ('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    nombre: {type: String, required: true},
    apellido: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    timeStamp: {type: String, required: true},

});

userSchema.methods.encriptarPass = async(password) =>{
   const salt = await bcrypt.genSalt(6);
   const hashedPassword = bcrypt.hash(password, salt);
   return hashedPassword;
};

userSchema.methods.CompararPass = async function (password){
   return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('users', userSchema);
