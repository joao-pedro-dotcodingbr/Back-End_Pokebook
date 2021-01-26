const mongoose = require('../database')

const listSchema = new mongoose.Schema({

    User:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    pokemonsHeart:[{

        type:String,
        required:false,
        unique:true
        
    }],
    //Seguidores
    followers:[{

        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:false,
        unique:true
        
    }],
    //Seguindo
    followersMy:[{

        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:false,
        unique:true
        
    }]

})

const list = mongoose.model('myList' , listSchema);

module.exports = list;