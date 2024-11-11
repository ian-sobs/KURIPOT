'use strict';

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
   await queryInterface.bulkInsert('accounts', [
    {
      name: "BPI",
      user_id: 1,
    },
    {
      name: "BDO",
      user_id: 1,
    },
    {
      name: "CHINA BANK",
      user_id: 1,
    },
    {
      name: "GCASH",
      user_id: 1,
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
