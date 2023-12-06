const mongoose = require('mongoose');
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    userName:{
        type : String, 
        required : true,
    }, 
    password:{
        type : String, 
        required : true, 
    },
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
      const hash = await bcrypt.hash(this.password, 10);
      this.password = hash;
    }
    next();
  });

const User = mongoose.model('User', userSchema);

module.exports = User;
