const router = require("express").Router();
const authenticateUser = require("../middlewares/authentication");
const Hotel = require("../schema/hotel");

router.get("/getall", async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:hotelID", async (req, res) => {
  const { hotelID } = req.params;
  try {
    const hotel = await Hotel.findById(hotelID)
      .populate("owner", "username avatar")
      .populate("legalDocuments")
      .populate("services")
      .populate("policies");

    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
});

router.post("/create", authenticateUser, async (req, res) => {
  const {
    hotelName,
    hotelAddress,
    membershipStatus,
    hotelDescription,
    services,
    policies,
    images,
  } = req.body;

  const newHotel = new Hotel({
    hotelName,
    hotelAddress,
    membershipStatus,
    hotelDescription,
    owner: req.user.id,
    services,
    policies,
    images,
  });

  try {
    await newHotel.save();
    res
      .status(201)
      .json({ message: "Hotel created successfully", hotel: newHotel });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a hotel
router.put("/:hotelID", authenticateUser, async (req, res) => {
  const { hotelID } = req.params;
  const {
    newHotelName,
    hotelAddress,
    MembershipStatus,
    hotelDescription,
    owner,
  } = req.body;

  try {
    const hotel = await Hotel.findById(hotelID)
      .populate("owner")
      .populate("legalDocuments")
      .populate("services");

    if (!hotel) {
      res.status(404).json({ message: "Hotel not found" });
      return;
    }

    hotel.hotelName = newHotelName || hotel.hotelName;
    hotel.hotelAddress = hotelAddress || hotel.hotelAddress;
    hotel.membershipStatus = MembershipStatus || hotel.membershipStatus;
    hotel.hotelDescription = hotelDescription || hotel.hotelDescription;
    hotel.owner = owner || hotel.owner._id;

    await hotel.save();

    res.status(200).json({ message: "Hotel updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a hotel
router.delete("/:hotelID", authenticateUser, async (req, res) => {
  const { hotelID } = req.params;

  try {
    const hotel = await Hotel.findByIdAndDelete(hotelID);

    if (!hotel) {
      res.status(404).json({ message: "Hotel not found" });
      return;
    }

    res.status(200).json({ message: "Hotel deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
