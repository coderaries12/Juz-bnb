const express = require('express')
const { Spot,Review,User,SpotImage,ReviewImage,sequelize,Booking} = require('../../db/models');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check,body } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const booking = require('../../db/models/booking');
const router = express.Router();

//Delete a Review Image
router.delete('/:imageId',requireAuth,async(req,res)=>{ 
    const { user } = req;
    const id=user.dataValues.id
    const ReviewToDelete=await Review.findByPk(req.params.imageId)
    if(!ReviewToDelete){
        return res.status(404).json({
            message:"Review Image couldn't be found"    
        }) 
    }
    if(ReviewToDelete.userId !== id){
        return res.status(404).json({
            message:"Review must belong to the current user"    
        })
    }
     await ReviewToDelete.destroy();
     return res.json({
       "message": "Successfully deleted"
      })
}) 















module.exports=router;
