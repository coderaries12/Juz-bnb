'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   options.tableName='Spots';
   await queryInterface.bulkInsert(options,[
    
      {
        "ownerId":1,
        "address": "64 Modoc Alley",
        "city": "Meridian",
        "state": "Idaho",
        "country": "United States ",
        "lat": 43.505875,
        "lng": -116.372627,
        "name": "Oasis By The Sea",
        "description": "Unwind and breathe in the fresh ocean air as you enjoy scenic views of the Puget Sound. ",
        "price": 720, 
      },
      {
        "ownerId":1,
        "address": "64 Modoc Alley",
        "city": "Rome",
        "state": "Lazio",
        "country": "Italy",
        "lat": 43.505875,
        "lng": -116.372627,
        "name": "Coastal Vista Getaway",
        "description": "Coastal Vista Getaway is located on the west side of Port Angeles, with a breathtaking view of the Straits of Juan de Fuca. ",
        "price": 256, 
      },
      {
        "ownerId":1,
        "address": "64 Modoc Alley",
        "city": "Varese",
        "state": "Lombardia",
        "country": "Italy",
        "lat": 43.505875,
        "lng": -116.372627,
        "name": "Dream Hideaway",
        "description": "Our newly refurbished hideaway is perfect for a small family or a few friends on vacation. ",
      },
      {
        "ownerId":1,
        "address": "64 Modoc Alley",
        "city": "Ottawa",
        "state": "Ontario",
        "country": "Canada",
        "lat": 43.505875,
        "lng": -116.372627,
        "name": "Mortlake",
        "description": "One small single bedroom/ box room. It is a cosy bedroom in a family home.",
        "price": 650, 
      },
      {
        "ownerId":1,
        "address": "64 Modoc Alley",
        "city": "Rome",
        "state": "Lazio",
        "country": "Italy",
        "lat": 43.505875,
        "lng": -116.372627,
        "name": "Clook Room",
        "description": "Our Place has a classic and contemporary feel to it.",
        "price": 156, 
      },


      {
        "ownerId":2,
        "address": "2177 Hillcrest Lane",
        "city": "Irvine",
        "state": "California",
        "country": "United States",
        "lat": 33.692253,
        "lng": -117.734627,
        "name": "Copacabana",
        "description": "You will be enchanted by this cozy bedroom suite. Great location, air and wifi.",
        "price": 900, 
      },
      {
        "ownerId":2,
        "address": "2177 Hillcrest Lane",
        "city": "Irvine",
        "state": "California",
        "country": "United States",
        "lat": 33.692253,
        "lng": -117.734627,
        "name": "French Gothic Home",
        "description": "Enjoy a sunny morning coffee in the garden, a glass of wine, or read by the fire in the living room on chilly nights. .",
        "price": 350, 
      },
      
      {
        "ownerId":2,
        "address": "2177 Hillcrest Lane",
        "city": "Bend",
        "state": "Oregon",
        "country": "United States",
        "lat": 33.692253,
        "lng": -117.734627,
        "name": "The Bamboo House",
        "description": "Designed as a minimalist space where you can get away from it all, the Satori Suite is tucked away on the slopes of Hualālai",
        "price": 250, 
      },
      {
        "ownerId":2,
        "address": "2177 Hillcrest Lane",
        "city": "Cedar City",
        "state": "Utah",
        "country": "United States",
        "lat": 33.692253,
        "lng": -117.734627,
        "name": "Satori Suite",
        "description": "Start the day with a coffee on the private balcony and take in one of Rome's most spectacular views.",
        "price": 275, 
      },
      {
        "ownerId":2,
        "address": "2177 Hillcrest Lane",
        "city": "Crestone",
        "state": "Colorado",
        "country": "United States",
        "lat": 33.692253,
        "lng": -117.734627,
        "name": "The Granary",
        "description": "The house is Grade II listed building, dated around 1600. It has full of character, with beautiful garden. ",
        "price": 750, 
      },
      
      {
        "ownerId":3,
        "address": "2811 Bernardo Street",
        "city": "Chandler",
        "state": "Indiana",
        "country": "United States of America",
        "lat": 38.031239,
        "lng": -87.392021,
        "name": "Stuart Manor Bed and Breakfast",
        "description": "Welcome to Stuart Manor, a mid-1800's Brick Italianate Home constructed by John Stuart, an early Cumberland County Judge.",
        "price": 890, 
      },
      {
        "ownerId":3,
        "address": "2811 Bernardo Street",
        "city": "Clinton",
        "state": "Washington",
        "country": "United States",
        "lat": 38.031239,
        "lng": -87.392021,
        "name": "Clook Room",
        "description": "Our Place has a classic and contemporay feel to it. Relaxing lighgthing once we do not like ceilling lights. ",
        "price": 750, 
      },
      {
        "ownerId":3,
        "address": "2811 Bernardo Street",
        "city": "Maple Valley",
        "state": "Washington",
        "country": "United States",
        "lat": 38.031239,
        "lng": -87.392021,
        "name": "Cedar River Trail",
        "description": "The Cedar River Trail is just a stone's throw away from Koi Story Cabin .",
        "price": 500, 
      },
      {
        "ownerId":3,
        "address": "2811 Bernardo Street",
        "city": "Chelan",
        "state": "Washington",
        "country": "United States",
        "lat": 38.031239,
        "lng": -87.392021,
        "name": "Historic Georgian Home",
        "description": "We look forward to welcoming you to our home. Your room is on the second floor . ",
        "price": 590, 
      },
      {
        "ownerId":3,
        "address": "2811 Bernardo Street",
        "city": "Sooke",
        "state": "British Columbia",
        "country": "Canada",
        "lat": 38.031239,
        "lng": -87.392021,
        "name": "Cacao Place",
        "description": "Enjoy the simplicity of this peaceful, quiet, and centrally-located home. ",
        "price": 350, 
      },

      {
        "ownerId":4,
        "address": "3456 Chembur street",
        "city": "Malibu",
        "state": "California",
        "country": "United States",
        "lat": 45.031239,
        "lng": -95.392021,
        "name": "Botafogo Room",
        "description": "The room (very large) is completely renovated to receive guests.",
        "price": 170, 
      },
      {
        "ownerId":4,
        "address": "3456 Chembur street",
        "city": "Hoodsport",
        "state": "Washington",
        "country": "United States",
        "lat": 45.031239,
        "lng": -95.392021,
        "name": "West LA Architectural Gem",
        "description": "The bedroom is located in our home's back wing.  ",
        "price": 850, 
      },
      {
        "ownerId":4,
        "address": "3456 Chembur street",
        "city": "Cavinti",
        "state": "Calabarzon",
        "country": "Philippines",
        "lat": 45.031239,
        "lng": -95.392021,
        "name": "Lovely apartment",
        "description": "PNice apartment with a very cozy living room, a large terrace, an equipped kitchen, two bedrooms and a bathroom. ",
        "price": 900, 
      },
      {
        "ownerId":4,
        "address": "3456 Chembur street",
        "city": "Ninh Giang",
        "state": "Ninh Bình",
        "country": "Vietnam",
        "lat": 45.031239,
        "lng": -95.392021,
        "name": "Antebellum",
        "description": "Historic Greek Revival, near the edge of the French Quarter. This beautiful home is dressed out in period style.",
        "price": 1500, 
      },
      {
        "ownerId":4,
        "address": "3456 Chembur street",
        "city": "Ubud",
        "state": "Bali",
        "country": "Indonesia",
        "lat": 45.031239,
        "lng": -95.392021,
        "name": "Artsy Private Suite",
        "description": "The space has been carefully decorated by Rafic, but what makes it so unique, is Jasmine's colorful paintings lining the walls .",
        "price": 870, 
      },

      

   ],{})

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName='Spots';
    await queryInterface.bulkDelete(options)
  }
};
