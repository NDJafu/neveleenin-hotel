const mongoose = require("mongoose");

const legalDocumentSchema = new mongoose.Schema({
    hotelID: {
        type: mongoose.Schema.ObjectId,
        ref: "Hotel",
        required: true
    },
    documentName: { 
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true 
    }
});

const LegalDocument = mongoose.model("LegalDocument", legalDocumentSchema);
module.exports = LegalDocument;
