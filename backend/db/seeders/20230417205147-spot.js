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
    
        "address": "64 Modoc Alley",
        "city": "Meridian",
        "state": "Idaho",
        "country": "United States of America",
        "lat": 43.505875,
        "lng": -116.372627,
        "name": "Mark Miller",
        "description": "Place of potatoes",
        "price": 156, 
      },
      {
    
        "address": "2177 Hillcrest Lane",
        "city": "Irvine",
        "state": "California",
        "country": "United States of America",
        "lat": 33.692253,
        "lng": -117.734627,
        "name": "Millie Watson",
        "description": "Place full of techies",
        "price": 255, 
      },
      {
    
        "address": "2811 Bernardo Street",
        "city": "Chandler",
        "state": "Indiana",
        "country": "United States of America",
        "lat": 38.031239,
        "lng": -87.392021,
        "name": "Peter Johson",
        "description": "Place full of surprises",
        "price": 164, 
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
