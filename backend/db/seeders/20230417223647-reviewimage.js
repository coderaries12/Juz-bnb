'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const { mapFinderOptions } = require('sequelize/types/utils');

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
    url:'image12 url'
   },
   {
    url:'image156 url'
   },
   {
    url:'image1343 url'
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
    mapFinderOptions.tableName='Reviews';
    await queryInterface.bulkDelete(options)
  }
};
