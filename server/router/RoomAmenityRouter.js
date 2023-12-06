const router = require("express").Router();
const RoomAmenity = require("../schema/roomAmenity");

// Get all room amenities
router.route("/getall").get(async (req, res) => {
  try {
    const roomAmenities = await RoomAmenity.find().populate("RoomID");
    res.status(200).json(roomAmenities);
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
});

// Create a new room amenity
router.post('/create', async (req, res) => {
  const { RoomID, name, description } = req.body;

  const newRoomAmenity = new RoomAmenity({ RoomID, name, description });

  try {
    await newRoomAmenity.save();
    res.status(201).json({ message: 'Room amenity created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a room amenity
router.put('/:roomAmenityId', async (req, res) => {
  const roomAmenityId = req.params.roomAmenityId;
  const { RoomID, name, description } = req.body;

  try {
    const roomAmenity = await RoomAmenity.findById(roomAmenityId);

    if (!roomAmenity) {
      res.status(404).json({ message: 'Room amenity not found' });
      return;
    }

    roomAmenity.RoomID = RoomID || roomAmenity.RoomID;
    roomAmenity.name = name || roomAmenity.name;
    roomAmenity.description = description || roomAmenity.description;

    await roomAmenity.save();

    res.status(200).json({ message: 'Room amenity updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a room amenity
router.delete('/:roomAmenityId', async (req, res) => {
  const roomAmenityId = req.params.roomAmenityId;

  try {
    const roomAmenity = await RoomAmenity.findByIdAndDelete(roomAmenityId);

    if (!roomAmenity) {
      res.status(404).json({ message: 'Room amenity not found' });
      return;
    }

    res.status(200).json({ message: 'Room amenity deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
