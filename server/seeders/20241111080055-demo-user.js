'use strict';

/** @type {import('sequelize-cli').Migration} */
const moment = require('moment')
const localDate = moment("2024-11-11 14:00", "YYYY-MM-DD HH:mm"); 
const utcDate = localDate.utc()

const bcrypt = require('bcrypt');
//const saltRounds = 10;
const myPlaintextPassword = 'test123';
//const someOtherPlaintextPassword = 'not_bacon';
async function hashPassword(password) {
  const saltRounds = 10; // You can adjust the salt rounds as needed
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('Hashed Password:', hashedPassword);
    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error);
  }
}

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
    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        username: "tester",
        birthdate: utcDate,
        email: "tester@test.com",
        password: hashPassword(myPlaintextPassword),

      }

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
