const Apartment = require("../models/apartmentModel");
const mongoose = require("mongoose");
const yup = require("yup");

const apartmentSchema = yup.object().shape({
  name: yup.string().required().max(98),
  rooms: yup.number().required().positive().integer(),
  price: yup.number().required().positive().integer(),
  description: yup.string().max(98),
});

// get all apartments
const getApartments = async (req, res) => {
  let apartments;
  let sortParam = 0;
  if (req.query.sort === "asc") {
    sortParam = 1;
  }
  if (req.query.sort === "desc") {
    sortParam = -1;
  }

  if (req.query.search) {
    apartments = await Apartment.find({ rooms: Number(req.query.search) }).sort(
      { price: sortParam }
    );
  } else {
    apartments = await Apartment.find({}).sort({ price: sortParam });
  }
  res.status(200).json(apartments);
};

// get a specific apartment
const getApartment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such apartment" });
  }

  const apartment = await Apartment.findById(id);

  if (!apartment) {
    return res.status(404).json({ error: "No such apartment" });
  }

  res.status(200).json(apartment);
};

// create a new apartment
const createApartment = async (req, res) => {
  const { rooms, name, price, description } = req.body;

  // add to DB
  try {
    await apartmentSchema.validate(req.body);
    const apartment = await Apartment.create({
      rooms,
      name,
      price,
      description,
    });
    res.status(200).json(apartment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete an apartment
const deleteApartment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such apartment" });
  }

  const apartment = await Apartment.findOneAndDelete({ _id: id });

  if (!apartment) {
    return res.status(400).json({ error: "No such apartment" });
  }

  res.status(200).json(apartment);
};

// update an apartment
const updateApartment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such apartment" });
  }

  const apartment = await Apartment.findOneAndUpdate(
    { _id: id },
    { ...req.body }
  );

  if (!apartment) {
    return res.status(400).json({ error: "No such apartment" });
  }

  res.status(200).json(apartment);
};

module.exports = {
  getApartments,
  getApartment,
  createApartment,
  deleteApartment,
  updateApartment,
};
