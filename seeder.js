const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const Characters = require('./models/Characters');
const Episodes = require('./models/Episodes');
const Locations = require('./models/Locations');

const { connectDB } = require('./db');

const Character = JSON.parse(fs.readFileSync(`${__dirname}/characters.json`, 'utf-8'));
const Episode = JSON.parse(fs.readFileSync(`${__dirname}/episodes.json`, 'utf-8'));
const Location = JSON.parse(fs.readFileSync(`${__dirname}/locations.json`, 'utf-8'));

// Import into DB
const importData = async () => {
  try {
    await Characters.create(Character);
    console.log('Characters created');
    await Episodes.create(Episode);
    console.log('Episodes created');
    await Locations.create(Location);
    console.log('Locations created');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// Delete data from DB
const deleteData = async () => {
  try {
    await Characters.deleteMany();
    console.log('Characters deleted');
    await Episodes.deleteMany();
    console.log('Episodes deleted');
    await Locations.deleteMany();
    console.log('Locations deleted');
    process.exit();
  } catch (err) {
    console.log(err);
  }
}

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

connectDB();
