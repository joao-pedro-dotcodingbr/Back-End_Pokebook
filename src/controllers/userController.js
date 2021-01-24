const express = require('express');

const User = require('../models/User');
const bcrypt = require('bcryptjs');

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

router.post('/signIn' , async (req , res) =>{

    const {email , password} = req.body;

    try{

        const user = await User.findOne({email}).select('+password');

        if(!user)
         return res.status(400).json({
            error:true,
            message:'Usuário não encontrado'

         })

         if(! await bcrypt.compare( password , user.password ))
            return res.status(400).json({
                error:true,
                message:'Senha do usuário incorreto'

            })

        user.password = undefined;

        res.json({user})


    }
    catch(err){

        console.log(err)

        return res.status(400).json({
            error:true,
            message: err
        })

    }

})

router.post('/teste' , async (req , res) =>{

    const user = await User.create(req.body)

    res.json({user})
    
})
router.post('/register' , async (req , res ) =>{

    try{

      const user = await User.create(req.body)

      user.password = undefined

      res.json({user})

    }
    catch(err){

        console.log(err)

        return res.status(400).json({
            error:true,
            message: err
        })

    }

})

module.exports = app => app.use('/user' , router)