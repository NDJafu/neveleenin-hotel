const mongoose = require("mongoose");

const invoiceSchema = mongoose.Schema({
  reservationID: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "Reservation",
  },
  paymentMethod: {
    type: String,
    enum: ["CREDIT_CARD", "CASH"],
  },
});

const Invoice = mongoose.model("Invoice", invoiceSchema);
module.exports = Invoice;
