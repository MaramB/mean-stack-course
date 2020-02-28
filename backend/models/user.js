const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    friends: [String]
});

userSchema.statics.hashPassword = function hashPassword(password){
    return bcrypt.hashSync(password,10);
}

userSchema.methods.isValid = function(hashedpassword){
    return  bcrypt.compareSync(hashedpassword, this.password);
}

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);