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
        
    }],
    //Seguidores
    followers:[{

        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:false,

        
    }],
    //Seguindo
    followersMy:[{

        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:false,

        
    }]

})

const list = mongoose.model('myList' , listSchema);

module.exports = list;