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
   options.tableName='SpotImages';
   await queryInterface.bulkInsert(options,[
    {
      "spotId":1,
      "url":'https://res.cloudinary.com/dxrhf8ah9/image/upload/v1683437672/1_jts1jr.jpg',
      "preview":true
    },
    { 
      "spotId":2,
      "url":'https://res.cloudinary.com/dxrhf8ah9/image/upload/v1683437672/1_jts1jr.jpg',
      "preview":false
    },
    {  
      "spotId":3,
      "url":'https://res.cloudinary.com/dxrhf8ah9/image/upload/v1683437672/1_jts1jr.jpg',
      "preview":true
    },
    {  
      "spotId":4,
      "url":'https://res.cloudinary.com/dxrhf8ah9/image/upload/v1683437672/1_jts1jr.jpg',
      "preview":true
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
    options.tableName='SpotImages';
    await queryInterface.bulkDelete(options)
  }
};
