'use strict';
const { Model, Validator } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Spot,{
        foreignKey:'ownerId'
      })
      User.belongsToMany(models.spot,{
        through:models.Review,
        foreignKey:'userId',
        otherKey:'spotId'
      })
      User.belongsToMany(models.Spot,{
        through:models.Booking,
        foreignKey:'userId',
        otherKey:'spotId'
      })
    }
  }
  User.init({
    firstName:{
    type:DataTypes.STRING,
    allowNull:false,
    },
    lastName:{
    type:DataTypes.STRING,
    allowNull:false
    },
    username: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          }
      }
    },
    email:{
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        len: [3, 256],
        isEmail: true
      }
  },
    hashedPassword:{
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        len: [60, 60]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope:{
      attributes:{
        exclude:["hashedPassword", "email", "createdAt", "updatedAt"]
      }
    }
  });
  return User;
};
