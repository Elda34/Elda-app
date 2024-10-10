const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    country: { type: String, required: false },
    street: { type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false },
    postalCode: { type: String, required: false }
  }, { _id: false });

  const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    // profilePic: { type: String }, // Can store URL or base64 encoded string
    role: { type: String, default: 'GENERAL' }, 
    mobile: { type: String, required: false },
    address: { type: addressSchema, required: false },
  }, {
    timestamps: true
  });


const userModel =  mongoose.model("User",userSchema)


module.exports = userModel
