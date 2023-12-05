const router = require("express").Router();
const HotelService = require("../schema/hotelService");

// Get all hotel services
router.route("/getall").get(async (req, res) => {
  try {
    const hotelServices = await HotelService.find().populate("HotelID");
    res.status(200).json(hotelServices);
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
});

// Create a new hotel service
router.post('/create', async (req, res) => {
  const { HotelID, name, description } = req.body;

  const newHotelService = new HotelService({ HotelID, name, description });

  try {
    await newHotelService.save();
    res.status(201).json({ message: 'Hotel service created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a hotel service
router.put('/:hotelServiceId', async (req, res) => {
  const hotelServiceId = req.params.hotelServiceId;
  const { HotelID, name, description } = req.body;

  try {
    const hotelService = await HotelService.findById(hotelServiceId);

    if (!hotelService) {
      res.status(404).json({ message: 'Hotel service not found' });
      return;
    }

    hotelService.HotelID = HotelID || hotelService.HotelID;
    hotelService.name = name || hotelService.name;
    hotelService.description = description || hotelService.description;

    await hotelService.save();

    res.status(200).json({ message: 'Hotel service updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a hotel service
router.delete('/:hotelServiceId', async (req, res) => {
  const hotelServiceId = req.params.hotelServiceId;

  try {
    const hotelService = await HotelService.findByIdAndDelete(hotelServiceId);

    if (!hotelService) {
      res.status(404).json({ message: 'Hotel service not found' });
      return;
    }

    res.status(200).json({ message: 'Hotel service deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
