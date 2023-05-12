const express = require('express')
const { Spot,Review,User,SpotImage,ReviewImage,sequelize,Booking} = require('../../db/models');
const spot = require('../../db/models/spot');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check} = require('express-validator');
//const {query}=require('express-validator')
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
 const queryValidator=[
  check('page')
  .isInt({min:1})
  .optional()
  .withMessage('Page must be greater than or equal to 1'),
  check('size')
  .isInt({min:1})
  .optional()
  .withMessage('Size must be greater than or equal to 1'),
  check('maxLat')
  .isFloat({max:90})
  .optional()
  .withMessage('Maximum latitude is invalid'),
  check('minLat')
  .isFloat({min:-90})
  .optional()
  .withMessage('Minimum latitude is invalid'),
  check('minLng')
  .isFloat({min:-180})
  .optional()
  .withMessage('Minimum longitude is invalid'),
  check('maxLng')
  .isFloat({max:180})
  .optional()
  .withMessage('Maximum longitude is invalid'),
  check('minPrice')
  .isInt({min:1})
  .optional()
  .withMessage('Minimum price must be greater than or equal to 0'),
  check('maxPrice')
  .isInt({min:1})
  .optional()
  .withMessage('Maximum price must be greater than or equal to 0'),
  handleValidationErrors
 ]; 




//Get Spots
router.get('/',queryValidator,async(req,res)=>{ 
  let {page,size}=req.query;
  const where={}
  const pagination={}
  if(!page)  page=1;
  if(!size)  size=20;
  page=parseInt(page);
  size=parseInt(size);
    if (
        Number.isInteger(page) && Number.isInteger(size) &&
        page > 0 && size > 0 && size <= 20
    ) {
        pagination.limit = size;
        pagination.offset = size * (page - 1);
    } 
  if(size > 20) {
        size=20;
        pagination.limit = size;
        pagination.offset = size * (page - 1);
  } 

let Spots=await Spot.findAll({
    ...pagination,
    raw:true
});


let reviews=await Review.findAll({
     attributes:['spotId','stars'],
     raw:true
})
for(let spot of Spots){
    
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

return res.json({Spots,page,size})

})

//### Get all Spots owned by the Current User
router.get('/current',requireAuth,async(req,res)=>{ 
    const { user } = req;
    const id=user.dataValues.id
    let Spots=await Spot.findAll({
        where:{
            ownerId:id
        },
        raw:true
    });
   for(let spot of Spots){
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
return (res.json({Spots}))

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
            as:"Owner",
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
  const { user } = req;
  const id=user.dataValues.id
const { address,city,state, country, lat,lng,name,description,price } = req.body; 
const newSpot = await Spot.create({ 
    ownerId:id,
    address,city,state, country, lat,lng,name,description,price
});  

return (res.json(newSpot))
})

//### Edit a Spot
router.put('/:spotId',validateSpot,async(req,res)=>{
  const { user } = req;
  const id=user.dataValues.id
const { address,city,state, country, lat,lng,name,description,price } = req.body;
let spotToEdit=await Spot.findByPk(req.params.spotId)
if(!spotToEdit){
    return res.status(404).json({
        error:{
            message: "Spot couldn't be found"
        }
    })
}
if(spotToEdit.ownerId !== id){
  return res.status(404).json({
    error:{
        message: "Spot must belong to the current user"
    }
})
}
spotToEdit.ownerId=id
spotToEdit.address=address
spotToEdit.city=city;
spotToEdit.state=state
spotToEdit.country=country;
spotToEdit.lat=lat
spotToEdit.lng=lng;
spotToEdit.name=name;
spotToEdit.description=description;
spotToEdit.price=price

await spotToEdit.save();

return res.json(spotToEdit)
})

//Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images',requireAuth,async(req,res)=>{ 
  const { user } = req;
  const id=user.dataValues.id
  const { url,preview} = req.body; 
   console.log("Inside the backend",req.body)
  const newSpot = await Spot.findByPk(req.params.spotId);  
  if(!newSpot) {
    return res.status(404).json({
      "message": "Spot couldn't be found"
    })
  }
  if(newSpot.ownerId !== id){
    return res.status(404).json({
      "message": "Spot must belong to the current user"
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
      attributes:['spotId','startDate','endDate'] 
    
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
   const currUserBookings=await Booking.findAll({
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
      for(let currbooking of currUserBookings){
      if(((currbooking.startDate).getTime() <= newStartdate) && ((currbooking.endDate).getTime() >= newendDate))
      {
          return res.status(403).json({
            "message": "Sorry, this spot is already booked for the specified dates",
            "errors": {
              "startDate": "Start date conflicts with an existing booking",
              "endDate": "End date conflicts with an existing booking"
            }  
          })
      }
      if((currbooking.startDate).getTime() >= newStartdate && ((currbooking.startDate).getTime() <= newendDate)) {
        return res.status(403).json({
          "message": "Sorry, this spot is already booked for the specified dates",
          "errors": {
            "startDate": "Start date conflicts with an existing booking",
          }
        })
          
      }   
      if((currbooking.endDate).getTime() >= newStartdate && ((currbooking.endDate).getTime() <= newendDate)) {
        return res.status(403).json({
          "message": "Sorry, this spot is already booked for the specified dates",
          "errors": {
            "endDate": "End date conflicts with an existing booking",
          
      }   

  })

      }
    }
           
   let spotIdBooking=await Booking.create({
       spotId:newSpot.id,
       userId:id,
       startDate:newStartdate,
       endDate:newendDate
     
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
