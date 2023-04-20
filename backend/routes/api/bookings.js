const express = require('express')
const { Spot,Review,User,SpotImage,ReviewImage,sequelize,Booking} = require('../../db/models');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check,body } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const booking = require('../../db/models/booking');
const router = express.Router();
 
//Get all of the Current User's Bookings
router.get('/current',requireAuth,async(req,res)=>{ 
    console.log("hello")
    const { user } = req;
    const id=user.dataValues.id
    let currBooking=await Booking.findAll({
        where:{
            userId:id
        },
        include:[
            {
                model:Spot,
                attributes:{exclude:['createdAt','updatedAt']}  
            },                   
        ], 
              
    });
   let Bookings=[]
    for(let booking of currBooking){
        booking=booking.toJSON()
        Bookings.push(booking)
        //console.log(bookingList)
        let spotImages=await SpotImage.findAll({
            where:{
                spotId:Bookings[0].spotId,
                //preview:true
            },
           raw:true       
        }) 
        for(let image of spotImages){
        if(image.preview===0){
                Bookings[0].Spot.previewImage=null   
        }
        if(image.preview===1)
            Bookings[0].Spot.previewImage=image.url       
        }
    }
            
return (res.json({Bookings}))

})
   

//Edit a Booking

router.put('/:bookingId',requireAuth,async(req,res)=>{
    const { startDate,endDate} = req.body;
    const { user } = req;
    const id=user.dataValues.id
    let newStartdate=(new Date(startDate)).getTime()
    let newendDate=(new Date(endDate)).getTime()
    if(newendDate <= newStartdate){
    return res.status(400).json({
        "errors": {
            "endDate": "endDate cannot come before startDate"
          }
        })  
    }
    let bookingToEdit=await Booking.findByPk(req.params.bookingId)
    if(!bookingToEdit){
        return res.status(404).json({
            error:{
                "message": "Booking couldn't be found"
            }
        })
    }
    if((bookingToEdit.endDate).getTime() <= new Date().getTime()){
        return res.status(403).json({
                "message": "Past bookings can't be modified"
              
        })
    }
    if(((bookingToEdit.startDate).getTime() === newStartdate)|| ((bookingToEdit.endDate).getTime() === newendDate))
    {
        return res.status(403).json({
                "message": "Sorry, this spot is already booked for the specified dates",
                "errors": {
                  "startDate": "Start date conflicts with an existing booking",
                  "endDate": "End date conflicts with an existing booking"
                }      
        })
    }
    
    if(bookingToEdit.userId!== id){
     return res.status(404).json({
        message:"Booking must belong to the current user"
     })
    }
   
    bookingToEdit.userId=id
    bookingToEdit.startDate=startDate
    bookingToEdit.endDate=endDate
    await bookingToEdit.save();
    
    return res.json(bookingToEdit)
    })



//Delete a Booking
router.delete('/:bookingsId',requireAuth,async(req,res)=>{ 
    const { user } = req;
    const id=user.dataValues.id
    console.log(req.user.id)
    const bookingToDelete=await Booking.findByPk(req.params.bookingsId)
    const spot=await Spot.findOne({
        where:{
            id:bookingToDelete.spotId
        }    
    })
    if(bookingToDelete.userId !== id || spot.ownerId !== id){
        return res.status(400).json({
          "message":"Booking must belong to the current user or the Spot must belong to the current user"  
        })
       }
    if((bookingToDelete.startDate).getTime() >= new Date().getTime()){
        return res.status(403).json({
            "message": "Bookings that have been started can't be deleted"
              
        })
    }
    if(!bookingToDelete){
     return res.status(404).json({
       "message": "Booking couldn't be found"
     })
    }
    
    

     console.log(bookingToDelete)
    // await bookingToDelete.destroy();
     return res.json({
       "message": "Successfully deleted"
      })
}) 
module.exports=router;
