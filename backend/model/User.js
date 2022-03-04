const mongoose = require('mongoose');

//a plugin which adds pre-save validation for unique fields within a Mongoose schema.
const uniqueValidator = require('mongoose-unique-validator');

// Fucntion to require email validation before signup
let validateEmail = (email) => {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

// MODEL
const userSchema = mongoose.Schema({
    userId: { type: String, required: false, unique: true},
    email: { type: String, required: true, unique: true, validate: [validateEmail, 'Please fill a valid email address'] },
    password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);