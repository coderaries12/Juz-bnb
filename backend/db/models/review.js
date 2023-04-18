'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.hasMany(models.ReviewImage,{
        foreignKey:'reviewId'
      })
      

    }
  }
  Review.init({
    spotId:{
      type: DataTypes.INTEGER,
      references:{
        model:'Spots'
      }

    },
    userId:{
      type: DataTypes.INTEGER,
      references:{
        model:'Users'
      }

    },
    review:{
      type: DataTypes.STRING,
      allowNull:false

    },

    stars: {
      type:DataTypes.INTEGER,
      allowNull:false

    },
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
