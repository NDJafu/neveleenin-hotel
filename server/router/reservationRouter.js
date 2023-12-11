const router = require("express").Router();
const authenticateUser = require("../middlewares/authentication");
const Reservation = require("../schema/reservation")

router.get("/getall", async (req, res) => {
    try {
      const reservation = await Reservation.find().populate("userID").populate("roomID");
      res.status(200).json(reservation);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

router.route("/getReservasion/:reservationID").get(async (req, res) => {
  const { reservationID } = req.params;
  try {
    const reservation = await Reservation.findById(reservationID);
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
});

router.route("/getReservasionsByUser/:userID").get(async (req, res) => {
    const { userID } = req.params;
    try {
      const reservations = await Reservation.find({ userID: userID });
      res.status(200).json(reservations);
    } catch (error) {
      res.status(500).json({ Error: error.message });
    }
  });

// Create a new reservation, bitch!!!
router.post("/create", authenticateUser, async (req, res) => {
    const { roomID, userID, status, checkInTime, checkOutTime } = req.body;
  
    const bookTime = Date.now();
    const momentObject = moment(bookTime);
    const bookingDate = momentObject.format("YYYY-MM-DD HH:mm:ss");
    const newReservation = new Reservation({ roomID, userID, status, bookingDate, checkInTime, checkOutTime });

  try {
    await newReservation.save();
    res.status(201).json({ message: "Reservation created successfully" });
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
router.delete("/:reservationID", authenticateUser, async (req, res) => {
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
