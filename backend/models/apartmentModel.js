const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const apartmentSchema = new Schema(
  {
    rooms: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

// Apartment model:
// - id: string
// - rooms: number
// - name: string
// - price: number
// - description: string

module.exports = mongoose.model("Apartment", apartmentSchema);
