const express = require('express')
const { Spot,Review,User,SpotImage,ReviewImage,sequelize,Booking} = require('../../db/models');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check,body } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const booking = require('../../db/models/booking');
const router = express.Router();


//Delete a Spot Image
router.delete('/:imageId',requireAuth,async(req,res)=>{ 
    const { user } = req;
    const id=user.dataValues.id
    
    const imageToDelete=await SpotImage.findByPk(req.params.imageId)
    if(!imageToDelete){
        return res.status(404).json({
            message:"Spot Image couldn't be found"    
        }) 
    }
    const spot=await Spot.findOne({
        where:{
            id:imageToDelete.spotId
        }    
    })
    if(spot.ownerId !== id){
        return res.status(404).json({
            message:"Spot must belong to the current user"    
        })
    }
    
    
     await imageToDelete.destroy();
     return res.json({
       "message": "Successfully deleted"
      })
}) 

module.exports=router;
