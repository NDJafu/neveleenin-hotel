const { Double } = require("mongodb")
const mongoose = require("mongoose")

const invoice = mongoose.Schema({
    reverstrationID: {
        type: mongoose.Schema.ObjectId,
        require: true,
        ref: "Reverstration"
    },
    paymentMethod: {
        type: String,
        enum: ['CREDIT_CARD', 'CASH']
    }
})

const Invoice = mongoose.model("Invoice", Invoice)
module.exports = Invoice