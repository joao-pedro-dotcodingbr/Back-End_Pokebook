const express = require('express');
const List = require('../models/MyList')
const authMiddlewares = require('../middlewares/auth')
const router = express.Router()

router.use(authMiddlewares)

router.get('/user/:idUser' , async (req , res) =>{

    try{

        const list = await List.findOne({User: req.params.idUser}).populate(['followers' , 'followersMy' , 'User']);

        return res.json(list)

    }
    catch(err){

        console.log(err)

        return res.status(400).json({error:err})

    }

})

router.put('/addItem/:idUser' , async (req , res) =>{
    try{

        const newItem = await List.updateOne({ User: req.params.idUser } ,
            { 
                
                '$push':req.body

            })

        return res.json({message:'Update (ADD) new item'})

    }
    catch(err){
        console.log(err)
        return res.status(400).json({
            error:err
        })
    }
})

router.put('/delete/:idUser' , async ( req , res ) =>{

    try{

        const list = await List.updateOne({idUser: req.body.idUser} , {

            $pull:req.body
            
        })

        res.json({message:' Update (Delete) item'})

    }
    catch(err){

        console.log(err)
        return res.status(400).json({
            error:err
        })

    }

})

module.exports = app => app.use('/myList' , router);