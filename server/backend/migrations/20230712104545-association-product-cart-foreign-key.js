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
    return Promise.all([queryInterface.addColumn( /// Product.belongsTo(User)
      'CartItems', // name of Source model
      'ProductId', // name of the key we're adding 
      {
        type: Sequelize.BIGINT,
        primaryKey: true,
        references: {
          model: 'Products', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }
    ),
    queryInterface.addColumn( /// Product.belongsTo(User)
      'CartItems', // name of Source model
      'CartId', // name of the key we're adding 
      {
        type: Sequelize.BIGINT,
        primaryKey: true,
        references: {
          model: 'Carts', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }
    )
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return Promise.all([
      queryInterface.removeColumn( /// Product.belongsTo(User)
        'CartItems', // name of Source model
        'ProductId' // key we want to remove
      ),
      queryInterface.removeColumn( /// Cart.belongsTo(User)
        'CartItems', // name of Source model
        'CartId' // key we want to remove
      )
    ])
  }
};
