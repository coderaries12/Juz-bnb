const express = require('express')
const { Spot,Review,User,SpotImage,ReviewImage,sequelize,Booking} = require('../../db/models');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check,body } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const booking = require('../../db/models/booking');
const router = express.Router();

const validateSpot = [
    check('review')
      .exists({ checkFalsy: true })
      .withMessage('Review text is required'),
    check('stars')
    .exists({ checkFalsy: true })
    .isInt({min:1,max:5})
    .withMessage("Stars must be an integer from 1 to 5"),
    
     handleValidationErrors
  ];

//Add an Image to a Review based on the Review's id
router.post('/:reviewId/images',requireAuth,async(req,res)=>{ 
    const { user } = req;
    const id=user.dataValues.id
    const { url} = req.body; 
    const ReviewfindbyId = await Review.findByPk(req.params.reviewId,{
        include:ReviewImage,
    });
    if(!ReviewfindbyId) {
        return res.status(404).json({
          "message": "Review couldn't be found"
        })
      } 
    if(ReviewfindbyId.userId !== id){
        return res.status(404).json({
            "message": "Review must belong to the current user"
          }) 
    } 
    if((ReviewfindbyId.toJSON()).ReviewImages.length >= 10){
        return res.status(403).json({
            "message": "Maximum number of images for this resource was reached"   
        })
    }
    console.log((ReviewfindbyId.toJSON()).ReviewImages.length)
    let newReviewImage=await ReviewImage.create({
        reviewId:ReviewfindbyId.id,
        url, 
    })
    
    return (res.json(newReviewImage))
    })


//Edit a Review
router.put('/:reviewId',validateSpot,async(req,res)=>{
    const { review,stars } = req.body;
    const { user } = req;
    const id=user.dataValues.id
    const Reviewtoedit = await Review.findByPk(req.params.reviewId);
    if(!Reviewtoedit) {
        return res.status(404).json({
          "message": "Review couldn't be found"
        })
      } 
    if(Reviewtoedit.userId !== id){
        return res.status(404).json({
            "message": "Review must belong to the current user"
          }) 
    } 
    Reviewtoedit.userId=id;
    Reviewtoedit.review=review
    Reviewtoedit.stars=stars;
    
    
    await Reviewtoedit.save();
    
    return res.json(Reviewtoedit)
    })


//Delete a Review
router.delete('/:reviewId',requireAuth,async(req,res)=>{ 
    const { user } = req;
    const id=user.dataValues.id
    const Reviewtodelete = await Review.findByPk(req.params.reviewId);
    if(!Reviewtodelete) {
        return res.status(404).json({
          "message": "Review couldn't be found"
        })
      } 
    if(Reviewtodelete.userId !== id){
        return res.status(404).json({
            "message": "Review must belong to the current user"
          }) 
    } 
     await Reviewtodelete.destroy();
     return res.json({
       "message": "Successfully deleted"
      })
   })

module.exports=router;
