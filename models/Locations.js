const { Schema, model, mongoose } = require('mongoose');

const locationSchema = new Schema({
  _id: { type: String, required: true },
  name: String,
  type: String,
  dimension: String,
  residents: [{
    type: mongoose.Types.ObjectId,
    ref: 'Characters',
  }],
  created: String,
});

module.exports = model('locations', locationSchema);
