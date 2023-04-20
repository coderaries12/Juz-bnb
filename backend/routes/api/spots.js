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
      .isFloat({min:-90, max:+90})
      .withMessage('Latitude is not valid'),
    check('lng')
      .exists({ checkFalsy: true })
      .isFloat({min:-180, max:+180})
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

 const validationReview=[
  check('review')
  .exists({ checkFalsy: true })
  .withMessage('Review text is required'),
  check('stars').exists({ checkFalsy: true })
  .isInt({min:1,max:5})
  .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors
 ]; 


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
  requireAuth,validationReview,
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
  const newSpot=await Spot.findByPk(req.params.spotId);
  if(!newSpot){
    return res.status(404).json({
      "message": "Spot couldn't be found"
    })
  }
 else if(newSpot.ownerId===id){
    const Bookings=await Booking.findAll({
      where:{
        spotId:newSpot.id,
        userId:id
      },
      include:{
        model:User,
        attributes:['id','firstName','lastName']
      }
    })
    return res.json(Bookings)
  }
  else if(newSpot.ownerId !==id){
    const Bookings=await Booking.findAll({
      where:{
        spotId:newSpot.id,
      }, 
      attributes:['id','spotId','startDate','endDate'] 
    
    })
    return res.json({Bookings})
  }
  })
  
 //Create a Booking from a Spot based on the Spot's id
 router.post('/:spotId/bookings',requireAuth,
  async(req,res)=>{ 
   const { user } = req;
   const id=user.dataValues.id
   const { startDate,endDate} = req.body; 
   let newStartdate=(new Date(startDate)).getTime()
    let newendDate=(new Date(endDate)).getTime()
   const newSpot = await Spot.findByPk(req.params.spotId); 
   if(!newSpot){
    return res.status(404).json({
      "message": "Spot couldn't be found"
    })
   } 
   const currUserBooking=await Booking.findOne({
    where:{
      spotId:newSpot.id
    } 
   })
   if(newSpot.ownerId===id){
    return res.status(400).json({
      "message":"Spot must NOT belong to the current user"
    })
   }
   if(newendDate <= newStartdate){
    return res.status(400).json({
        "errors": {
            "endDate": "endDate cannot come before startDate"
          }
        }) 
      }
      if(((currUserBooking.startDate).getTime() === newStartdate)|| ((currUserBooking.endDate).getTime() === newendDate))
      {
          return res.status(403).json({
                  "message": "Sorry, this spot is already booked for the specified dates",
                  "errors": {
                    "startDate": "Start date conflicts with an existing booking",
                    "endDate": "End date conflicts with an existing booking"
                  }      
          })
      }
           
   let spotIdBooking=await Booking.create({
       spotId:newSpot.id,
       userId:newSpot.ownerId,
       startDate,
       endDate
     
    })
   return res.json(spotIdBooking) 
    
 })  

 //Delete a spot
 router.delete('/:spotId',requireAuth,async(req,res)=>{ 
   const { user } = req;
   const id=user.dataValues.id
   const spotToDelete=await Spot.findByPk(req.params.spotId)
   if(!spotToDelete){
    return res.status(404).json({
      "message": "Spot couldn't be found"
    })
   }
   else if(spotToDelete.ownerId !== id){
    return res.json({
      message:"Spot must belong to the current user"
    })
   }
   else if(spotToDelete.ownerId===id){
    await spotToDelete.destroy();
    return res.json({
      "message": "Successfully deleted"
     })

   }
  })

 
module.exports=router;
