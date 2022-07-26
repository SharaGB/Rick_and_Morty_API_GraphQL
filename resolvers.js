const Characters = require('./models/Characters');
const Episodes = require('./models/Episodes');
const locations = require('./models/Locations');

const resolvers = {
  Query: {
    // Get a specific character by ID
    async character(_, { _id }) {
      const resultCharacter = await Characters.findById(_id);
      return resultCharacter;
    },

    // Get the list of all characters
    async characters(_, { page }) {
      page = page || 1;
      let pages = page * 20;
      let size = pages - 20;
      let results = await Characters.find({}).skip(size).limit(20);

      let totalLength = await Characters.countDocuments({});
      // JSON.stringify(results);

      const info = { pages: Math.round(totalLength / 20), count: totalLength, next: page + 1, prev: page - 1 };
      return { results, info };
    },

    // Get a specific episode by ID
    async episode(_, { _id }) {
      const resultEpisode = await Episodes.findById(_id);
      return resultEpisode;
    },

    // Get the list of all episodes
    async episodes(_, { page }) {
      page = page || 1;
      let pages = page * 20
      let size = pages - 20
      let results = await Episodes.find().skip(size).limit(20);
      let totalLength = await Episodes.countDocuments({});

      const info = { pages: Math.round(totalLength / 20), count: totalLength, next: page + 1, prev: page - 1 || null };
      return { results, info };
    },

    // Get a specific locations by ID
    async location(_, { _id }) {
      const resultLocation = await locations.findById(_id);
      return resultLocation;
    },

    // Get the list of all locations
    async locations(_, { page }) {
      page = page || 1;
      let pages = page * 20
      let size = pages - 20
      let results = await locations.find().skip(size).limit(20);
      let totalLength = await locations.countDocuments({});

      const info = { pages: Math.round(totalLength / 20), count: totalLength, next: page + 1, prev: page - 1 };
      return { results, info };
    },
  },
};

module.exports = { resolvers };
