const router = require("express").Router();
const LegalDocument = require("../schema/legalDocument");

// Get all legal documents
router.route("/getall").get(async (req, res) => {
  try {
    const legalDocuments = await LegalDocument.find().populate("hotelID");
    res.status(200).json(legalDocuments);
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
});

// Create a new legal document
router.post('/create', async (req, res) => {
  const { hotelID, documentName, description } = req.body;

  const newLegalDocument = new LegalDocument({ hotelID, documentName, description });

  try {
    await newLegalDocument.save();
    res.status(201).json({ message: 'Legal document created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a legal document
router.put('/:legalDocumentId', async (req, res) => {
  const legalDocumentId = req.params.legalDocumentId;
  const { hotelID, documentName, description } = req.body;

  try {
    const legalDocument = await LegalDocument.findById(legalDocumentId);

    if (!legalDocument) {
      res.status(404).json({ message: 'Legal document not found' });
      return;
    }

    legalDocument.hotelID = hotelID || legalDocument.hotelID;
    legalDocument.documentName = documentName || legalDocument.documentName;
    legalDocument.description = description || legalDocument.description;

    await legalDocument.save();

    res.status(200).json({ message: 'Legal document updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a legal document
router.delete('/:legalDocumentId', async (req, res) => {
  const legalDocumentId = req.params.legalDocumentId;

  try {
    const legalDocument = await LegalDocument.findByIdAndDelete(legalDocumentId);

    if (!legalDocument) {
      res.status(404).json({ message: 'Legal document not found' });
      return;
    }

    res.status(200).json({ message: 'Legal document deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
