const express = require('express')
const { Spot,Review,User,SpotImage,sequelize} = require('../../db/models');
const spot = require('../../db/models/spot');

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
//console.log("Total Reviews",reviews)

for(let spot of spots){
    let starSum=0;
    let spotReviews=reviews.filter(review=>review.spotId===spot.id)
   // console.log("Spot Reviews",spotReviews)
    for(const spotReview of spotReviews){
        starSum+=spotReview.stars
    }
    spot.avgRating=(starSum/spotReviews.length)
   console.log("Avg rating",spots.avgRating)
    
    let spotImageUrl=await SpotImage.findOne({
        attributes:['url'],
        where:{
            spotId:spot.id,
            preview:true
        },
        raw:true
    })
    console.log(spotImageUrl)
    if(spotImageUrl){
        spot.previewImage=spotImageUrl.url
    }
    
}
return res.json({spots})

})



module.exports=router;
