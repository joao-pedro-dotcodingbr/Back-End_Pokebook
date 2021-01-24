const mongoose = require('mongoose');
const UrlMongo = process.env.MONGOURL || 'mongodb://localhost/Apipokemon'

mongoose.connect(UrlMongo , {useCreateIndex:true , useNewUrlParser:true , useUnifiedTopology:true}).then(() =>{
    console.log('Connect Database(MongoDB)')
})

module.exports = mongoose;