const { Schema, model } = require('mongoose');

const characterSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  name: String,
  status: String,
  species: String,
  type: String,
  gender: String,
  origin: {
    type: Schema.ObjectId,
    ref: 'locations'
  },
  location: {
    type: Schema.ObjectId,
    ref: "locations",
  },
  image: String,
  episode: [
    {
      type: Schema.ObjectId,
      ref: 'Episodes',
    },
  ],
  created: String,
});

function autopopulate(next) {
  this.populate({ path: 'location', select: 'name _id' })
  this.populate({ path: 'origin', select: 'name _id' })
  next()
};

characterSchema.pre('find', autopopulate);
characterSchema.pre('findOne', autopopulate);

module.exports = model('Characters', characterSchema);
