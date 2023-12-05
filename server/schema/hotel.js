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

const mongoose = require('mongoose');
const User = require('./user');

const hotelSchema = new mongoose.Schema({
    hotelName:{
        type : String, 
        required : true, 
    },
    owner:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        require : true
    },
    legalDocument: {
        type: mongoose.Schema.ObjectId,
        ref: "LegalDocument",
        require: true
    },
    hotelAddress: {
        type: String,
        require: true,
    },
    MembershipStatus:  {
        type : String,
        enum: ['Available', 'Not_Available'],
        default : 'Available', 
        required : true, 
    }, 
    hotelDescription: {
      type: String,
      require: true,  
    },
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel; 
