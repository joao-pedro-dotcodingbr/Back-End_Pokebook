const express = require('express');
const List = require('../models/MyList')
const authMiddlewares = require('../middlewares/auth')
const router = express.Router()

router.use(authMiddlewares)

router.get('/user/:id' , async (req , res) =>{

    try{

        const list = await List.findOne({idUser: req.params.id})

        return res.json(list)

    }
    catch(err){

        console.log(err)

        return res.status(400).json({error:err})

    }

  
})

router.put('/addItem/:id' , async (req , res) =>{
    try{

        const newItem = await List.updateOne({ idUser: req.params.id } ,
            { 
                
                '$push':req.body

            })

        return res.json({message:'new Array'})

    }
    catch(err){
        console.log(err)
        return res.status(400).json({
            error:err
        })
    }
})

module.exports = app => app.use('/myList' , router);