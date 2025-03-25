const mongoose = require('mongoose');

const phishingSiteSchema = new mongoose.Schema({
  url: { type: String, required: true },
  risk_level: { type: String, required: true },
  detected_on: { type: Date, required: true },
  category: { type: String, required: true },
  investigate: { type: Boolean, default: false },
  block: { type: Boolean, default: false }
});

const PhishingSite = mongoose.model('PhishingSite', phishingSiteSchema);
module.exports = PhishingSite;
