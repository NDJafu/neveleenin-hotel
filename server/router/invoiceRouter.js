const router = require("express").Router();
const Invoice = require("../schema/invoice");
const Reservation = require("../schema/reservation");

// Get all invoices
router.route("/getall").get(async (req, res) => {
  try {
    const invoices = await Invoice.find().populate("reservationID");
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
});

// Create a new invoice
router.post("/create", async (req, res) => {
  const { reservationID, paymentMethod } = req.body;

  const newInvoice = new Invoice({ reservationID, paymentMethod });
  const reservation = await Reservation.findById(reservationID);

  reservation.status = "PLACED";

  try {
    await newInvoice.save();
    await reservation.save();
    res.status(201).json({ message: "Invoice created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an invoice
router.put("/:invoiceId", async (req, res) => {
  const invoiceId = req.params.invoiceId;
  const { reverstrationID, paymentMethod } = req.body;

  try {
    const invoice = await Invoice.findById(invoiceId);

    if (!invoice) {
      res.status(404).json({ message: "Invoice not found" });
      return;
    }

    invoice.reverstrationID = reverstrationID || invoice.reverstrationID;
    invoice.paymentMethod = paymentMethod || invoice.paymentMethod;

    await invoice.save();

    res.status(200).json({ message: "Invoice updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an invoice
router.delete("/:invoiceId", async (req, res) => {
  const invoiceId = req.params.invoiceId;

  try {
    const invoice = await Invoice.findByIdAndDelete(invoiceId);

    if (!invoice) {
      res.status(404).json({ message: "Invoice not found" });
      return;
    }

    res.status(200).json({ message: "Invoice deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
