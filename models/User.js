const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const accountTypeSchema = mongoose.Schema({
    type: String,
    enum: ['personal', 'business']
})

const userSchema = mongoose.Schema({
	name: { type: String, required: true},
    username: {type: String, 
                unique: true,
                required: true},
    password: {type: String, required: true},
    email: {type: String, 
                unique: true,
                required: true},
    description: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Description'
    }],
    accountType: [accountTypeSchema],
    contact: String,
    address: String,
    hours: String,
});
userSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next()
});

const User = mongoose.model('User', userSchema);

module.exports = User;