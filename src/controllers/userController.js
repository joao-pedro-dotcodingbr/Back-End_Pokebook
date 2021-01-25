const express = require('express');

const User = require('../models/User');
const List = require('../models/MyList')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const router = express.Router();

const authConfig = require('../config/auth')

const GerationToken = (params)=>{

    return jwt.sign({ params } , authConfig , {
        expiresIn: 86400
    })

}

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

        res.json({

            user,
            token: GerationToken({id: user.id})
        
        })


    }
    catch(err){

        console.log(err)

        return res.status(400).json({
            error:true,
            message: err
        })

    }

})

router.post('/register' , async (req , res ) =>{

    try{

      const user = await User.create(req.body)

      await List.create({ idUser: user.id})

      user.password = undefined

      res.json({
          user,
          token: GerationToken({id: user.id})
        
        })

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