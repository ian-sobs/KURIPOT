'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await queryInterface.createTable('goals', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        // Add other fields as needed, for example:
        // name: { type: Sequelize.STRING, allowNull: false }
      });
      console.log("Migration successful");
    } catch (error) {
      console.error("Migration failed:", error);
    }
  },

  async down (queryInterface, Sequelize) {
    try {
      await queryInterface.dropTable('goals');
      console.log("Rollback successful");
    } catch (error) {
      console.error("Rollback failed:", error);
    }
  }
};
