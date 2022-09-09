import mongoose from "mongoose";

const RegistrationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  roles: {
    User: Number,
    Editor: Number,
    Admin: Number,
  },
  password: {
    type: String,
  },
  refreshToken: {
    type: String,
  },
  googleId: {
    type: String,
  },
});

const Registration_Data = mongoose.model(
  "Registraion_Data",
  RegistrationSchema
);
export default Registration_Data;
