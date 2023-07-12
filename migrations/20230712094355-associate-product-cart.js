'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // Product belongsToMany Tag
    // Product belongsToMany Cart
    return queryInterface.createTable(
      'CartItems',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        quantity: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        // if this does not add foreign key run separate migration to add one
        ProductId: {
          type: Sequelize.BIGINT,
          primaryKey: true,
          references: {
            model: 'Carts',
            key: 'id'
          }
        },
        CartId: {
          type: Sequelize.BIGINT,
          primaryKey: true,
          references: {
            model: 'Products',
            key: 'id'
          }
        },
      }
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    // remove table
    return queryInterface.dropTable('CartItems');
  }
};
