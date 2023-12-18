const router = require("express").Router();
const authenticateUser = require("../middlewares/authentication");
const Hotel = require("../schema/hotel");
const Room = require("../schema/room");

router.get("/getRoomsByHotel/:hotelID", async (req, res) => {
  const { hotelID } = req.params;
  try {
    const rooms = await Room.find({ hotelID: hotelID }).populate("amenities");
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
});

router.get("/:roomID", async (req, res) => {
  const { roomID } = req.params;
  try {
    const room = await Room.findById(roomID).populate("hotelID");
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
});

// Create a new room
router.post("/create", authenticateUser, async (req, res) => {
  const { name, price, hotelID, roomNumber, roomSize, amenities, images } =
    req.body;

  const newRoom = new Room({
    name,
    price,
    hotelID,
    roomNumber,
    roomSize,
    amenities,
    images,
  });
  const hotel = await Hotel.findById(hotelID);
  const isRoomPriceLowest = price < hotel.pricing || true;

  if (isRoomPriceLowest) {
    hotel.pricing = price;
  }

  try {
    await newRoom.save();
    await hotel.save();
    res.status(201).json({ message: "Room created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a room
router.put("/:roomID", authenticateUser, async (req, res) => {
  const roomID = req.params.roomID;
  const { name, price, hotel, roomSize } = req.body;

  try {
    const room = await Room.findOne(roomID).populate("hotelID");

    if (!room) {
      res.status(404).json({ message: "Room not found" });
      return;
    }

    room.name = name || room.name;
    room.price = price || room.price;
    room.hotelID = hotel || room.hotelID;
    room.roomSize = roomSize || room.roomSize;

    await room.save();

    res.status(200).json({ message: "Room updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a room
router.delete("/:roomID", authenticateUser, async (req, res) => {
  const roomID = req.params.roomID;

  try {
    const room = await Room.findOneAndDelete(roomID);

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
