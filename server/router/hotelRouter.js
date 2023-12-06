const router = require("express").Router()
const Hotel = require("../schema/hotel")

router.route("/getall").get(async (req, res) => {
    try {
        const Hotels = await Hotel.find()
        res.status(200).json(Hotels)
    }
    catch {
        res.status(500).json({Error: error.message})
    }
})

router.route("/create").post(async (req, res) => {
    const { hotelName, hotelAddress, MembershipStatus, hotelDescription, owner, legalDocument } = req.body;

    const newHotel = new Hotel({ hotelName, hotelAddress, MembershipStatus, hotelDescription, owner, legalDocument });
    try {
        await newHotel.save();
        res.status(201).json({ message: 'Hotel created successfully' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
})

// Update a hotel
router.put('/:hotelName', async (req, res) => {
    const hotelName = req.params.hotelName;
    const { hotelName: newHotelName, hotelAddress, MembershipStatus, hotelDescription, owner, legalDocument } = req.body;
  
    try {
      const hotel = await Hotel.findOne(hotelName).populate('owner').populate('legalDocument');
  
      if (!hotel) {
        res.status(404).json({ message: 'Hotel not found' });
        return;
      }
  
      hotel.hotelName = newHotelName || hotel.hotelName;
      hotel.hotelAddress = hotelAddress || hotel.hotelAddress;
      hotel.MembershipStatus = MembershipStatus || hotel.MembershipStatus;
      hotel.hotelDescription = hotelDescription || hotel.hotelDescription;
      hotel.owner = owner || hotel.owner._id;
      hotel.legalDocument = legalDocument || hotel.legalDocument._id;
  
      await hotel.save();
  
      res.status(200).json({ message: 'Hotel updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Delete a hotel
  router.delete('/:hotelName', async (req, res) => {
    const hotelName = req.params.hotelName;
  
    try {
      const hotel = await Hotel.findOneAndDelete(hotelName);
  
      if (!hotel) {
        res.status(404).json({ message: 'Hotel not found' });
        return;
      }
  
      res.status(200).json({ message: 'Hotel deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  module.exports = router;