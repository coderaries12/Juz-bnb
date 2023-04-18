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
   options.tableName='Reviews';
   await queryInterface.bulkInsert(options,[
    { 
      "spotId":1,
      "userId":1,
      "review":'Excellent Spot!',
      "stars": 5 
    },
    {  
      "spotId":2,
      "userId":2,
      "review":'Very good Spot!',
      "stars": 4 
    },
    {  
      "spotId":3,
      "userId":3,
      "review":'Average Spot!',
      "stars": 3
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
    options.tableName='Reviews';
    await queryInterface.bulkDelete(options)
  }
};
