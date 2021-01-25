const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth')

// Verification Token
module.exports = (req , res , next) =>{

    const authHeader = req.headers.authorization // pegando o token no headers

    if(!authHeader) // Existe dados ?
        return res.status(401).send({error:'No token provided'})

    const parts = authHeader.split(' ')// convertendo em um array em um ponto de divisão

    if(!parts.length === 2){ // Existe as duas partes do token (Bearer,token) ?

        return res.status(401).send({error:'Error Token'})

    }

    const [scheme , token] = parts; // adicionando variáveis nas partes do array

    //Search da palavra Bearer
    if(!/^Bearer$/i.test(scheme)){
        return res.status(401).send({error:'Token malformatted'})

    }

    jwt.verify(token , authConfig , (err , decoded) =>{
        if(err)   return res.status(401).send({error:'Token invaled'})

        req.userId = decoded.id;

        return next();
    })

}