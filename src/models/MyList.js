const mongoose = require('../database')

const listSchema = new mongoose.Schema({

    idUser:{
        type:String,
        required:true
    },
    pokemonsHeart:{

        type:[String],
        required:false
        
    },
    //Seguidores
    followers:{

        type: [String],
        required:false

    },
    //Seguindo
    followersMy:{

        type: [String],
        required:false

    }

})

const list = mongoose.model('myList' , listSchema);

module.exports = list;