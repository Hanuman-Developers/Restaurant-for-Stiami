import mongoose from "mongoose";

const IPSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
});

const Ipschema = mongoose.model("IP", IPSchema);
export default Ipschema;
