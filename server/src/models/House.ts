import mongoose from "mongoose";

const SlideSchema = new mongoose.Schema({
  slideImg: {
    type: String,
    required: true,
  },
  slideTitle: {
    type: String,
    required: true,
  },
  slideDescr: {
    type: String,
    required: true,
  },
});
const HouseSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 100,
    required: true,
  },
  district: String,
  street: String,
  repair: {
    type: String,
    enum: ["without", "renovation", "cosmetic", "designer"],
    required: true,
  },
  rooms: Number,
  area: Number,
  price: Number,
  landArea: Number,
  categories: [
    {
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 40,
    },
  ],
  advantages: [
    {
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 40,
    },
  ],
  slides: [SlideSchema],
  images: [String],
  presentationFile: String,
  agent: {
    type: mongoose.Types.ObjectId,
    ref: "Agent",
  },
});

export default mongoose.model("House", HouseSchema);
