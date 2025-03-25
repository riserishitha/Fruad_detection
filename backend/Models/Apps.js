const mongoose=require('mongoose');

const FraudAppSchema = new mongoose.Schema({
  app_name: { type: String, required: true },
  developer: { type: String, required: true },
  category: { type: String, required: true },
  risk_level: { type: String, required: true },
  reported_on: { type: String, required: true },
  investigation_status: { type: Boolean, default: false },
  block_status: { type: Boolean, default: false }
});

const FraudApp = mongoose.model('FraudApp', FraudAppSchema);


module.exports=FraudApp;