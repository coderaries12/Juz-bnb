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
   options.tableName='ReviewImages';
   await queryInterface.bulkInsert(options,[
   {
    "reviewId":1,
    "url":'https://image123/1',

   },
   {
    "reviewId":2,
    "url":'https://image345/3'
   },
   {
    "reviewId":3,
    "url":'https://image567/4'
   },
   {
    "reviewId":4,
    "url":'https://image678/4'
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
