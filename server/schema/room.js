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

const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true
    },
    roomNumber: {
        type: Number,
        required: true
    },
    roomSize: {
        type: Number,
        required: true
    }
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
