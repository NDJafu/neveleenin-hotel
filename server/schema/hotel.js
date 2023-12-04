const mongoose = require('mongoose');
const User = require('./user');

const hotelSchema = new mongoose.Schema({
    name:{
        type : String, 
        required : true, 
    },
    status:  {
        type : String,
        enum : ['NEW','STATUS'],
        default : 'NEW', 
        required : true, 
    },
    owner:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        require : true
    }, 
    check_in:{
        type : time 
    }
});
  

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel; 