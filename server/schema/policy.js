const mongoose = require('mongoose');

 const policySchema = new mongoose.Schema({
    type: {
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