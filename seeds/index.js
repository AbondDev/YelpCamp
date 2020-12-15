const mongoose = require('mongoose');
const cities = require('./cities');
const {
  places,
  descriptors
} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '5fd15b1c59408712ea07f938',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      geometry: {
            type: 'Point',
            coordinates: [cities[random1000].longitude, cities[random1000].latitude]
        },
      images: [{
          url: 'https://res.cloudinary.com/abonddev/image/upload/v1607720261/YelpCamp/styuisjhvu6vc7zhd5lq.jpg',
          filename: 'YelpCamp/styuisjhvu6vc7zhd5lq'
        },
        {
          url: 'https://res.cloudinary.com/abonddev/image/upload/v1607720269/YelpCamp/pcmftodrjipow6qyuuzi.jpg',
          filename: 'YelpCamp/pcmftodrjipow6qyuuzi'
        },
        {
          url: 'https://res.cloudinary.com/abonddev/image/upload/v1607720287/YelpCamp/bfjxmhjivc92gkqvjixz.jpg',
          filename: 'YelpCamp/bfjxmhjivc92gkqvjixz'
        }
      ],
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      price
    })
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
})
