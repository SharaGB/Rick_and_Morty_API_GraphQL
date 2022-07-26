const { Schema, model, mongoose } = require('mongoose');

const episodeSchema = new Schema({
  _id: { type: String, required: true },
  name: String,
  air_date: String,
  episode: String,
  characters: [{
    type: mongoose.Types.ObjectId,
    ref: 'Characters',
  }],
  created: String,
});

module.exports = model('Episodes', episodeSchema);
