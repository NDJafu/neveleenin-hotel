const router = require("express").Router();
const authenticateUser = require("../middlewares/authentication");
const Room = require("../schema/room");

router.route("/getRoomsByHotel/:hotelID").get(async (req, res) => {
  const { hotelID } = req.params;
  try {
    const rooms = await Room.find({ hotelID: hotelID });
    res.status(200).json(rooms);
  } catch {
    res.status(500).json({ Error: error.message });
  }
});

// Create a new room
router.post("/create", authenticateUser, async (req, res) => {
  const { name, price, hotel, roomNumber, roomSize } = req.body;

  const newRoom = new Room({ name, price, hotel, roomNumber, roomSize });

  try {
    await newRoom.save();
    res.status(201).json({ message: "Room created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a room
router.put("/:roomNumber", authenticateUser, async (req, res) => {
  const roomNumber = req.params.roomNumber;
  const { name, price, hotel, roomSize } = req.body;

  try {
    const room = await Room.findOne(roomNumber).populate("hotel");

    if (!room) {
      res.status(404).json({ message: "Room not found" });
      return;
    }

    room.name = name || room.name;
    room.price = price || room.price;
    room.hotel = hotel || room.hotel._id;
    room.roomSize = roomSize || room.roomSize;

    await room.save();

    res.status(200).json({ message: "Room updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a room
router.delete("/:roomNumber", authenticateUser, async (req, res) => {
  const roomNumber = req.params.roomNumber;

  try {
    const room = await Room.findOneAndDelete(roomNumber);

    if (!room) {
      res.status(404).json({ message: "Room not found" });
      return;
    }

    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
