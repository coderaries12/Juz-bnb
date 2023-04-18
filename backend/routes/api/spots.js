const express = require('express')
const { Spot,sequelize} = require('../../db/models');

const router = express.Router();

//Get Spots
router.get('/',async(req,res)=>{ 
const spots=await Spot.findAll();
return res.json(spots)


})

module.exports=router;
