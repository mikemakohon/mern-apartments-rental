const express = require("express");
const {
  getApartments,
  getApartment,
  createApartment,
  deleteApartment,
  updateApartment,
} = require("../controllers/apartmentController");

const router = express.Router();

// GET all apartments
router.get("/", getApartments);

// GET a specific apartment
router.get("/:id", getApartment);

// POST a new apartment
router.post("/", createApartment);

// DELETE an apartment
router.delete("/:id", deleteApartment);

// UPDATE an apartment
router.patch("/:id", updateApartment);

module.exports = router;
