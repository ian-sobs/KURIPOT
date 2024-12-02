'use strict';

/** @type {import('sequelize-cli').Migration} */
const moment = require('moment')
const localDate = moment("2024-11-11 14:00", "YYYY-MM-DD HH:mm"); 
const utcDate = localDate.utc()

// const bcrypt = require('bcrypt');
// //const saltRounds = 10;
// const myPlaintextPassword = 'test123';
// //const someOtherPlaintextPassword = 'not_bacon';
// async function hashPassword(password) {
//   const saltRounds = 10; // You can adjust the salt rounds as needed
//   try {
//     const hashedPassword = await bcrypt.hash(password, saltRounds);
//     console.log('Hashed Password:', hashedPassword);
//     return hashedPassword;
//   } catch (error) {
//     console.error('Error hashing password:', error);
//   }
// }

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
        username: 'john_doe',
        birthDate: new Date('1990-01-01'),
        email: 'john@example.com',
        password: 'password123',  // Password will be hashed by the setter
        isFirstLogin: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'jane_doe',
        birthDate: new Date('1995-05-15'),
        email: 'jane@example.com',
        password: 'password456',  // Password will be hashed by the setter
        isFirstLogin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'alice_smith',
        birthDate: new Date('1992-03-10'),
        email: 'alice@example.com',
        password: 'password789',  // Password will be hashed by the setter
        isFirstLogin: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'bob_jones',
        birthDate: new Date('1988-07-22'),
        email: 'bob@example.com',
        password: 'password012',  // Password will be hashed by the setter
        isFirstLogin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'charlie_brown',
        birthDate: new Date('1991-11-11'),
        email: 'charlie@example.com',
        password: 'password345',  // Password will be hashed by the setter
        isFirstLogin: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'david_clark',
        birthDate: new Date('1993-08-19'),
        email: 'david@example.com',
        password: 'password678',  // Password will be hashed by the setter
        isFirstLogin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'eve_adams',
        birthDate: new Date('1994-04-05'),
        email: 'eve@example.com',
        password: 'password901',  // Password will be hashed by the setter
        isFirstLogin: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'frank_white',
        birthDate: new Date('1989-12-25'),
        email: 'frank@example.com',
        password: 'password234',  // Password will be hashed by the setter
        isFirstLogin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'grace_lee',
        birthDate: new Date('1996-06-30'),
        email: 'grace@example.com',
        password: 'password567',  // Password will be hashed by the setter
        isFirstLogin: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'henry_kim',
        birthDate: new Date('1997-09-12'),
        email: 'henry@example.com',
        password: 'password890',  // Password will be hashed by the setter
        isFirstLogin: false,
        createdAt: new Date(),
        updatedAt: new Date()
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
