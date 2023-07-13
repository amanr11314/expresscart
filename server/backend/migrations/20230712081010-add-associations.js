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
    return Promise.all([
      queryInterface.addColumn( /// Product.belongsTo(User)
        'Products', // name of Source model
        'UserId', // name of the key we're adding 
        {
          type: Sequelize.BIGINT,
          references: {
            model: 'Users', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      ),
      queryInterface.addColumn( /// Cart.belongsTo(User)
        'Carts', // name of Source model
        'UserId', // name of the key we're adding 
        {
          type: Sequelize.BIGINT,
          references: {
            model: 'Users', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      ),
      /// below migrations are needed but it is duplicate so not running again
      // queryInterface.addColumn( /// User.hasOne(Cart) => Payment.hasOne(Order)
      //   'Carts', // name of Target model
      //   'UserId', // name of the key we're adding
      //   {
      //     type: Sequelize.BIGINT,
      //     references: {
      //       model: 'Users', // name of Source model
      //       key: 'id',
      //     },
      //     onUpdate: 'CASCADE',
      //     onDelete: 'SET NULL',
      //   }
      // ),
      // queryInterface.addColumn( /// User.hasMany(Product) Order hasMany Product
      //   'Products', // name of Target model
      //   'UserId', // name of the key we're adding
      //   {
      //     type: Sequelize.BIGINT,
      //     references: {
      //       model: 'Users', // name of Source model
      //       key: 'id',
      //     },
      //     onUpdate: 'CASCADE',
      //     onDelete: 'SET NULL',
      //   }
      // )
    ]);
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
        'Products', // name of Source model
        'UserId' // key we want to remove
      ),
      queryInterface.removeColumn( /// Cart.belongsTo(User)
        'Carts', // name of Source model
        'UserId' // key we want to remove
      ),
      /// below migrations are needed but it is duplicate so not running again
      // queryInterface.removeColumn( /// User.hasOne(Cart) => Payment.hasOne(Order)
      //   'Carts', // name of the Target model
      //   'UserId' // key we want to remove
      // ),
      // queryInterface.removeColumn( /// User.hasMany(Product) Order hasMany Product
      //   'Products', // name of the Target model
      //   'UserId' // key we want to remove
      // )
    ]);
  }
};
