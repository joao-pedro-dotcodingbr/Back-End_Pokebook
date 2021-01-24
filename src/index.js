const express = require('express');
const app = express();
const UrlPort = process.env.PORT || 3000;


app.use(express.json());

require('./controllers/userController')(app)

app.listen(UrlPort , () =>{
    console.log('Servidor connect')
})