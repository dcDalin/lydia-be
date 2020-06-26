const bcrypt = require("bcryptjs");

const tableName = "admins";

module.exports.up = (queryInterface, DataTypes, done) => {
  return queryInterface
    .createTable(
      tableName,
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        firstName: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        lastName: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        email: {
          allowNull: false,
          type: DataTypes.STRING,
          unique: true,
        },
        password: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        createdAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        deletedAt: {
          allowNull: true,
          type: DataTypes.DATE,
        },
      },
      {
        charset: "utf8",
      }
    )
    .then(async function () {
      const password = await bcrypt.hash("password", 12);

      queryInterface.sequelize.query(`
				INSERT INTO admins
					("firstName", "lastName", "email", "password", "createdAt", "updatedAt") 
				VALUES
					('Admin', 'Admin', 'admin@admin.com', '${password}', 'NOW()', 'NOW()')
      `);
      console.log(`Created table ${tableName}`);
    })
    .catch((error) =>
      console.log(`Could not create table ${tableName}: ${error}`)
    );
};

module.exports.down = (queryInterface) => queryInterface.dropTable(tableName);
