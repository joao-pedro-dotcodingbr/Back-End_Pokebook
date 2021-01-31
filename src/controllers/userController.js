const express = require('express');

const User = require('../models/User');
const List = require('../models/MyList')
const bcrypt = require('bcryptjs');
const crypyto = require('crypto')
const jwt = require('jsonwebtoken')

const templates = require('../mail/index')
const router = express.Router();

const authConfig = require('../config/auth');
const { findOne } = require('../models/User');

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
const teste = 'teste'

router.post('/register' , async (req , res ) =>{

    const {email} = req.body;

    try{

      const verifEmail = await findOne({email})

      if(verifEmail)
        return res.status(400).send({error:true , message:'Já existe um usuário com esse Email'})

      if(!email.search('@') > -1)
        return res.status(400).send({error:true , message:'Email mal formatado (@)'})

      const user = await User.create(req.body)

      await List.create({User: user.id})

      user.password = undefined

      await templates.SendMensage( 

        "Pokébook <pokebook.com.br>" , 
        [user.email] , 
        'Bem vindo :)' , 
        'Seja bem vindo',
        ['Sua conta no pokebook:', 'Commodo consectetur mollit nisi veniam ut officia ipsum. Amet eiusmod nostrud proident irure in deserunt incididunt. Aute eu amet eiusmod cupidatat ad velit velit minim consectetur in id in nulla dolore. Nostrud non pariatur labore nulla deserunt quis tempor ad minim ipsum sint ullamco aute sit. Aute veniam labore sit qui ipsum cupidatat consequat dolor ea enim quis. Ullamco exercitation sunt esse incididunt non esse aliqua elit excepteur sit sunt ex sit. Fugiat ex do esse reprehenderit pariatur nulla elit.']
        
        )
        
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

router.post('/forgot_password' , async (req , res) =>{

    const {email} = req.body

    try{

        const user = await User.findOne({email})

        if(!user)
          return res.status(400).json({error:'Usuário não encontrado'})

        const token = crypyto.randomBytes(4).toString('hex')
        const now = new Date();

        now.setHours(now.getHours() + 1);

        await User.findByIdAndUpdate( user.id , {
            '$set':{
                passwordResetToken: token,
                passwordResetExpires:now
            }
        })

        await templates.SendMensagePass( 

                "Pokebook <pokebook.com.br>" , 
                [email] , 
                'Recuperar a senha' , 
                'Código de recuperação de senha',
                ['Senha de recuperação de senha:' , 'Senha de recuperação válida em 24h, caso perca a validade refaça o pedido de recuperação' ,  token]
            
            )

       return res.send('Email de recuperação enviada com sucesso!! caso não encontre nas mensagens procure na caixa de span')

    }
    catch(err){

        return res.status(400).json({
            error:true,
            message: err
        })

    }

})

router.post('/reset_password' , async (req , res) =>{

    const {email , token , password} = req.body;

    try{

        const user = await User.findOne({email}).select('+passwordResetExpires passwordResetToken')

        if(!user)
          return res.status(400).json({error:'user not found'})

        if(token !== user.passwordResetToken)
          return res.status(400).json({error:'token invaled'})

        const now = new Date();


        if(now > user.passwordResetExpires)
        return res.status(400).json({error:'token expired, generate a new one'})

        user.password = password

        await user.save()

        res.send()
    }

    catch(err){

        return res.status(400).json({
            error:true,
            message: err
        })

    }

})

module.exports = app => app.use('/user' , router)