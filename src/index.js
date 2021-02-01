const express = require('express');
const app = express();
const UrlPort = process.env.PORT || 3000;


app.use(express.json());

app.use(express.urlencoded({extended:false}))

require('./controllers/userController')(app)
require('./controllers/UserListControllers')(app)

app.listen(UrlPort , () =>{
    console.log('Servidor connect')
})