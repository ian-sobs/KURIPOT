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
        // Generate transactions for the past 7 days
        const now = new Date('2024-12-13T08:40:00Z'); // Set current date as provided
        const past7Days = [];
        for (let i = 0; i < 10; i++) {
          const randomDate = new Date(now - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)); // Random date within the past 7 days
          past7Days.push({
            user_id: 5,
            amount: (Math.random() * 1000).toFixed(2), // Random amount
            account_id: Math.floor(Math.random() * 3) + 1, // Random account_id between 1 and 3 (Ensure these accounts exist)
            accountName: `Account ${Math.floor(Math.random() * 3) + 1}`,
            date: randomDate,
            category_id: Math.floor(Math.random() * 5) + 1, // Random category_id between 1 and 5 (Ensure these categories exist)
            categoryName: `Category ${Math.floor(Math.random() * 5) + 1}`,
            from_account_id: Math.floor(Math.random() * 3) + 1,
            from_accountName: `From Account ${Math.floor(Math.random() * 3) + 1}`,
            to_account_id: Math.floor(Math.random() * 3) + 1,
            to_accountName: `To Account ${Math.floor(Math.random() * 3) + 1}`,
            note: `Transaction note ${i + 1}`,
            recurr_id: null, // No recurring transaction group
            type: Math.random() > 0.5 ? 'income' : 'expense', // Random type (income or expense)
            createdAt: new Date(),
            updatedAt: new Date()
          });
        }
    
        // Insert seed data into the transactions table
        await queryInterface.bulkInsert('Transaction', past7Days, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Transaction', { user_id: 5 }, {});
  }
};
