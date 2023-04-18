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
   options.tableName='Bookings';
   await queryInterface.bulkInsert(options,[
    {  
      "spotId":1,
      "userId":1,
      "startDate":"2020-11-15",
      "endDate":"2021-08-12"
    },
    {  
      "spotId":2,
      "userId":2,
      "startDate":"2005-10-14",
      "endDate":"2009-04-11"
    },
    { 
      "spotId":3,
      "userId":3,
      "startDate":"2006-08-17",
      "endDate":"2003-04-13"
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
