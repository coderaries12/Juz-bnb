const express = require('express')
const { Spot,Review,User,SpotImage,ReviewImage,sequelize,Booking} = require('../../db/models');
const spot = require('../../db/models/spot');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check,body } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const booking = require('../../db/models/booking');
const router = express.Router();
const validateSpot = [
    check('address')
      .exists({ checkFalsy: true })
      .withMessage('"Street address is required"'),
    check('city')
    .exists({ checkFalsy: true })
      .withMessage("City is required"),
    check('state')
      .exists({ checkFalsy: true })
     // .isLength({ min: 4 })
      .withMessage('State is required'),
    check('country')
      .exists({ checkFalsy: true })
      .withMessage('Country is required'),
    check('lat')
      .exists({ checkFalsy: true })
      .isLatLong({checkDMS:true})
      .withMessage('Latitude is not valid'),
    check('lng')
      .exists({ checkFalsy: true })
      .isLatLong({checkDMS:true})
      .withMessage('Longitude is not valid'),  
    check('name')
      .exists({ checkFalsy: true })
      .isLength({ max: 50 })
      .withMessage('Name must be less than 50 characters'),
    check('description')
      .exists({ checkFalsy: true })
      .withMessage('Description is required'), 
    check('price')
      .exists({ checkFalsy: true })
      .withMessage('Price per day is required'), 
    handleValidationErrors
  ];

//  const validationReview=[
//   body('review')
//   .exists({ checkFalsy: true })
//   .withMessage('Review text is required'),
//   body('stars').exists({ checkFalsy: true })
//   .isNumeric().isLength({min:1,max:5})
//   .withMessage("Stars must be an integer from 1 to 5"),
//  ]; 


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
    if(!spotbyId){
      return res.status(400).json({
        "message": "Spot couldn't be found"
      })  
    }
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
    starSum=starSum+review.stars
   }
   spotbyId.numReviews=reviews.length;
   console.log(reviews.length)
   spotbyId.avgStarRating=(starSum/reviews.length)
       
return(res.json(spotbyId))

})

//Create a Spot
router.post('/',validateSpot,async(req,res)=>{ 
const { address,city,state, country, lat,lng,name,description,price } = req.body; 
const newSpot = await Spot.create({ 
    address,city,state, country, lat,lng,name,description,price
});  

return (res.json(newSpot))
})

//### Edit a Spot
router.put('/:spotId',validateSpot,async(req,res)=>{
const { address,city,state, country, lat,lng,name,description,price } = req.body;
let spotToEdit=await Spot.findByPk(req.params.spotId)
if(!spotToEdit){
    return res.status(404).json({
        error:{
            message: "Spot couldn't be found"
        }
    })
}
spotToEdit.address=address
spotToEdit.city=city;
spotToEdit.state=state
spotToEdit.country=country;
spotToEdit.lat=lat
spotToEdit.lng=lng;
spotToEdit.adress=name
spotToEdit.city=description;

await spotToEdit.save();

return res.json(spotToEdit)
})

//Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images',requireAuth,async(req,res)=>{ 
  const { user } = req;
  const id=user.dataValues.id
  const { url,preview} = req.body; 
  //console.log(req.body)
  const newSpot = await Spot.findByPk(req.params.spotId,{
    where:{
      ownerId:id
    }
  });  
  if(!newSpot) {
    return res.status(404).json({
      "message": "Spot couldn't be found"
    })
  }
  let newImage=await SpotImage.create({
    spotId:newSpot.id,
    url,
    preview
  })
  
  return (res.json(newImage))
  })

  //Get all Reviews by a Spot's id
  router.get('/:spotId/reviews',async(req,res)=>{
    const newSpot=await Spot.findByPk(req.params.spotId,{
      raw:true
    });
    //console.log(newSpot)
    if(!newSpot){
      return res.status(404).json({
        "message": "Spot couldn't be found"
      })
    }
    let Reviews=await Review.findAll({
      where:{
        spotId:newSpot.id
      },
      include:[
        {
          model:User,
          attributes:['id','firstName','lastName']
        },
        {
          model:ReviewImage,
          attributes:['id','url']
        }
      ],
      

    })
    return res.json({Reviews})
  })

  //Create a Review for a Spot based on the Spot's id 
  router.post('/:spotId/reviews',
  requireAuth,
  body('review')
  .exists({ checkFalsy: true })
  .withMessage('Review text is required'),
  body('stars').exists({ checkFalsy: true })
  .isNumeric().isFloat({options: { min: 1, max: 5 }})
  .withMessage("Stars must be an integer from 1 to 5"),
  async(req,res)=>{ 
    const { user } = req;
    const id=user.dataValues.id
    const { review,stars} = req.body; 

    const newSpot = await Spot.findByPk(req.params.spotId);  
    if(!newSpot) {
      return res.status(404).json({
        "message": "Spot couldn't be found"
      })
    }
    let currentuserReviews=await Review.findAll({
      where:{
        spotId:newSpot.id
      },
      raw:true

    })
    for(let review of currentuserReviews){
      if(review.userId===id)
      {
        return res.status(500).json({
          "message": "User already has a review for this spot"
        })
      }
    }
    let newReview=await Review.create({
      spotId:newSpot.id,
      userId:id,
      review,
      stars  
    })
    return res.json(newReview) 
  })

 // Get all Bookings for a Spot based on the Spot's id
 router.get('/:spotId/bookings',requireAuth,async(req,res)=>{
  const { user } = req;
  const id=user.dataValues.id
  const newSpot=await Spot.findByPk(req.params.spotId,{
    raw:true
  });
  if(!newSpot){
    return res.status(404).json({
      "message": "Spot couldn't be found"
    })
  }
  const spotBookings=await Booking.findAll({
    where:{
      spotId:newSpot.id,
    },
    include:{
      model:User,
      attributes:['id','firstName','lastName']
    }
  })
  return res.json(spotBookings)

})

 //Create a Booking from a Spot based on the Spot's id
 router.post('/:spotId/bookings',requireAuth,async(req,res)=>{ 
   const { user } = req;
   const id=user.dataValues.id
   const { startDate,endDate} = req.body; 

   const newSpot = await Spot.findByPk(req.params.spotId);  
   if(!newSpot) {
     return res.status(404).json({
       "message": "Spot couldn't be found"
     })
   }
   let currentuserReviews=await Review.findAll({
     where:{
       spotId:newSpot.id
     },
     raw:true

    })
    
 })  
 
module.exports=router;
