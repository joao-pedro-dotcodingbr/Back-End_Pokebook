const express = require('express');
const User = require('../models/User')
const router = express.Router();

router.get('/list' , async (req , res) =>{

    try{

        const users = await User.find({})

        return res.json(users)

    }
    catch(err){
        return res.status(400).json({
            error:true,
            message: err
        })
    }
})

module.exports = app => app.use('/user' , router)