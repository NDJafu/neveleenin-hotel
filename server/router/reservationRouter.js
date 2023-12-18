const router = require("express").Router();
const authenticateUser = require("../middlewares/authentication");
const Reservation = require("../schema/reservation");

router.get("/getall", async (req, res) => {
  try {
    const reservation = await Reservation.find()
      .populate("userID")
      .populate("roomID");
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.route("/:reservationID").get(async (req, res) => {
  const { reservationID } = req.params;
  try {
    const reservation = await Reservation.findById(reservationID).populate({
      path: "roomID",
      populate: {
        path: "hotelID",
      },
    });
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
});

router.route("/getReservationsByUser/:userID").get(async (req, res) => {
  const { userID } = req.params;
  try {
    const reservations = await Reservation.find({ userID: userID });
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
});

// Create a new reservation, bitch!!!
router.post("/create", async (req, res) => {
  const {
    roomID,
    userID,
    email,
    guestName,
    status,
    checkInTime,
    checkOutTime,
    totalAmount,
  } = req.body;

  const newReservation = new Reservation({
    roomID,
    userID,
    status,
    email,
    guestName,
    checkInTime,
    checkOutTime,
    totalAmount,
  });

  try {
    await newReservation.save();
    res.status(201).json({
      message: "Reservation created successfully",
      reservation: newReservation,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a reservation
router.put("/:reservationID", authenticateUser, async (req, res) => {
  const reservationID = req.params.reservationID;
  const { status, checkInTime, checkOutTime } = req.body;

  try {
    const reservation = await Reservation.findById(reservationID);

    if (!reservation) {
      res.status(404).json({ message: "Reservation not found" });
      return;
    }

    reservation.status = status || reservation.status;
    reservation.checkInTime = checkInTime || reservation.checkInTime;
    reservation.checkOutTime = checkOutTime || reservation.checkOutTime;

    await reservation.save();
    res.status(200).json({ message: "Reservation updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a room
router.delete("/:reservationID", async (req, res) => {
  const reservationID = req.params.reservationID;

  try {
    const reservation = await Reservation.findOneAndDelete(reservationID);

    if (!reservation) {
      res.status(404).json({ message: "Reservation not found" });
      return;
    }

    res.status(200).json({ message: "Reservation deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
