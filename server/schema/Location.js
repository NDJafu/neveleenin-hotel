const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
    country:{
        type : String,
        require: true 
    },
    state_province:{
        type : String
    },
    adress:{
        type : String, 
        require: true
    } 
})