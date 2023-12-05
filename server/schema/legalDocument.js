const mongoose = require("mongoose")

const legalDocument = new mongoose.Schema({
    hotelID: {
        type: mongoose.Schema.ObjectId,
        ref: "Hotel",
        require: true
    },
    DocumentName: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: String
    }
})

const LegalDocument = mongoose.model(LegalDocument, legalDocument)
module.exports = LegalDocument;