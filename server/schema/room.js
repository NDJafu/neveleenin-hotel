const mongoose = require('mongoose');
const Hotel = require('./hotel');

const roomSchema = new mongoose.Schema({
    name:{
        type : String,
        require : true
    },
    price:{
        type : Int32Array,
        require : true
    },
    hotel:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Hotel',
        require : true
    }
})

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;