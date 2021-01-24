const mongoose = require('../database');
const bcrypt = require('bcrypt')
const UserSchema = new mongoose.Schema({
    name:{
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            unique:true,
            required:true
        },
        password:{
            type:String,
            required:true,
            select:false
        },
        passwordRestToken:{
            type:String,
            select:false
        },
        DatetokenExpires:{

            type:Date,
            select:false

        },
        dateRegister:{
            type:Date,
            default: Date.now
        }
    }
})
UserSchema.pre('save', async (next) =>{

    const hast = await bcrypt.hash(this.password , 10);

    this.password = hast

    next()


})

const user = mongoose.model('User', UserSchema)
module.exports = user;



