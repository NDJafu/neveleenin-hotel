const { Double } = require("mongodb");
const mongoose = require("mongoose");

const invoiceSchema = mongoose.Schema({
    reverstrationID: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "Reverstration"
    },
    paymentMethod: {
        type: String,
        enum: ['CREDIT_CARD', 'CASH']
    }
});

const Invoice = mongoose.model("Invoice", invoiceSchema);
module.exports = Invoice;
