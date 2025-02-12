import Tour from "../models/Tour.js";

// Create a new tour
export const createTour = async (req, res) => {
  const newTour = new Tour(req.body);

  try {
    // Save the new tour to the database
    const savedTour = await newTour.save();
    res.status(200).json({
      success: true,
      message: "Tour created successfully!",
      data: savedTour,
    });
  } catch (err) {
    console.error("Error creating tour:", err);
    res.status(500).json({
      success: false,
      message: "Failed to create tour",
      error: err.message,
    });
  }
};

//Update the tour
export const updateTour = async (req, res) => {
  const id = req.params.id;
  try {
    const updateTour = await Tour.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Successfully Updated!",
      data: updateTour,
    });
  } catch (err) {
    res.status(200).json({
      success: false,
      message: "Update failed!",
    });
  }
};
//Delete the tour
export const deleteTour = async (req, res) => {
  const id = req.params.id;
  try {
    await Tour.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Deleted Successfully!",
      data: deleteTour,
    });
  } catch (err) {
    res.status(200).json({
      success: false,
      message: "Failed to Delete",
    });
  }
};
//getsingle  tour
export const getSinglTour = async (req, res) => {
  const id = req.params.id;
  try {
    const tour = await Tour.findById(id).populate("reviews");
    res.status(200).json({
      success: true,
      message: "Found Successfully!",
      data: tour,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Not Found",
    });
  }
};
//get all  tour
export const getAllTour = async (req, res) => {
  //for pagination
  const page = parseInt(req.query.page);

  try {
    const tours = await Tour.find({})
      .populate("reviews")
      .skip(page * 8)
      .limit(8);
    res.status(200).json({
      success: true,
      message: "Found Successfully!",
      count: tours.length,
      data: tours,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Not Found",
    });
  }
};
export const getTourBySearch = async (req, res) => {
  const city = req.query.city ? new RegExp(req.query.city, "i") : undefined; // Case-insensitive regex for city
  const distance = req.query.distance ? parseInt(req.query.distance) : undefined;
  const maxGroupSize = req.query.maxGroupSize ? parseInt(req.query.maxGroupSize) : undefined;

  try {
    // Build a dynamic query object
    const query = {};
    if (city) query.city = city;
    if (distance) query.distance = { $lte: distance }; // Less than or equal to distance
    if (maxGroupSize) query.maxGroupSize = { $gte: maxGroupSize }; // Greater than or equal to max group size

    const tours = await Tour.find(query).populate("reviews");
    res.status(200).json({
      success: true,
      message: tours.length > 0 ? "Found Successfully!" : "No results found.",
      data: tours,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

//get feau\tured  tour
export const getFeaturedTour = async (req, res) => {
  try {
    const tours = await Tour.find({ featured: true }).populate("reviews").limit(8);
    res.status(200).json({
      success: true,
      message: "Found Successfully!",

      data: tours,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Not Found",
    });
  }
};

// get tour counts
export const getTourCount = async (req, res) => {
  try {
    const tourCount = await Tour.estimatedDocumentCount();
    res.status(200).json({ success: true, data: tourCount });
  } catch (err) {
    res.status(500).json({ success: false, message: "failed to fetch" });
  }
};

//get tour by duration
