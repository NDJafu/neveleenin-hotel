const mongoose = require('mongoose');

 const policySchema = new mongoose.Schema({
    hotelID: {
        type: mongoose.Schema.ObjectId,
        require: true,
        ref: "Hotel"
    },
    policyName: {
        type: String ,
        require : true
    },
    description:{
        type: String, 
        require: true 
    }
 })

 const Policy = mongoose.model('Policy', policySchema);

 module.exports = Policy;