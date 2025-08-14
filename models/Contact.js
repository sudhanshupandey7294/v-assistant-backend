const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  company: { type: String },
  role: { type: String },
  message: { type: String },
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Contact', contactSchema)