const mongoose = require('mongoose');
const UrlMongo = process.env.MONGOURL || 'mongodb://localhost/Apipokemon'

mongoose.connect(UrlMongo , { useNewUrlParser:true , useUnifiedTopology:true , useCreateIndex:true }).then(() =>{
    console.log('Connect Database(MongoDB)' )
})
mongoose.Promise = global.Promise;

module.exports = mongoose;