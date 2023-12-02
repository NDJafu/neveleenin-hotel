const mongoose = require('mongoose');

const accomodationSchema = new mongoose.Schema({
    name:{
        type : String, 
        require : true
    },
    type:{
        type : String, 
        enum :  ['smoking','bedding','breakfast','internet','in-room']
    }
})

const Accomodation = mongoose.model('Accomodation', accomodationSchema);

module.exports = Accomodation;