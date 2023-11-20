const mongoose = require('mongoose');
const User = require('./user');

const hotelSchema = new mongoose.Schema({
    name:{
        type : String, 
        required : true, 
    },
    address:{
        type : String, 
        required : true, 
    },
    state:  {
        type : String, 
        required : true, 
    },
    owner:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        require : true
    }
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel; 