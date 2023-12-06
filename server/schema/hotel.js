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

const hotelSchema = new mongoose.Schema({
    hotelName: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    legalDocument: {
        type: mongoose.Schema.ObjectId,
        ref: "LegalDocument",
        required: true,
    },
    hotelAddress: {
        type: String,
        required: true,
    },
    MembershipStatus: {
        type: String,
        enum: ['Available', 'Not_Available'],
        default: 'Available',
        required: true,
    },
    hotelDescription: {
        type: String,
        required: true,
    },
});

const Hotel = mongoose.model('Hotel', hotelSchema);


module.exports = Hotel;


