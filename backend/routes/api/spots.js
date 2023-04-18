const express = require('express')
const { Spot,Review,User,SpotImage,sequelize} = require('../../db/models');
const spot = require('../../db/models/spot');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();



//Get Spots
router.get('/',async(req,res)=>{ 
let spots=await Spot.findAll({
    raw:true
});


let reviews=await Review.findAll({
     attributes:['spotId','stars'],
     raw:true
})
for(let spot of spots){
    let starSum=0;
    let spotReviews=reviews.filter(review=>review.spotId===spot.id)
    for(const spotReview of spotReviews){
        starSum+=spotReview.stars
    }
    spot.avgRating=(starSum/spotReviews.length)
    
    let spotImageUrl=await SpotImage.findOne({
        attributes:['url'],
        where:{
            spotId:spot.id,
            preview:true
        },
        raw:true
    })
    if(spotImageUrl){
        spot.previewImage=spotImageUrl.url
    }
    
}
return res.json({spots})

})

//### Get all Spots owned by the Current User
router.get('/current',requireAuth,async(req,res)=>{ 
    const { user } = req;
    const id=user.dataValues.id
    let spots=await Spot.findAll({
        where:{
            ownerId:id
        },
        raw:true
    });
   for(let spot of spots){
    let reviews=await Review.findAll({
        attributes:['stars'],
        where:{
           spotId:spot.id
        },
        raw:true
   })
   let starSum=0;
   for (let review of reviews){
    starSum+=review.stars
   }
   spot.avgRating=(starSum/reviews.length)

   let spotImageUrl=await SpotImage.findOne({
    attributes:['url'],
    where:{
        spotId:spot.id,
        preview:true
    },
    raw:true
})
if(spotImageUrl){
    spot.previewImage=spotImageUrl.url
}
}
return (res.json({spots}))

})
//Get details of a Spot from an id
router.get('/:spotId',async(req,res)=>{ 
    let spotbyId=await Spot.findByPk(req.params.spotId,{
        include:[
            {
            model:SpotImage,
            attributes:['id','url','preview'],
        },
        {
            model:User,
            attributes:['id','firstName','lastName']
        },        
    ],
    
    }); 
   spotbyId=spotbyId.toJSON()
    let reviews=await Review.findAll({
        attributes:['stars'],
        where:{
           spotId:spotbyId.id
        },
        raw:true    
   })
   let starSum=0;
   for (let review of reviews){
    starSum+=review.stars
   }
   spotbyId.numReviews=reviews.length;
   spotbyId.avgStarRating=(starSum/reviews.length)
       
return(res.json(spotbyId))

})



module.exports=router;
