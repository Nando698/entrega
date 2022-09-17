import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    
    password: String,
    username: String,
    firstName: String,
    lastName: String
    
})

const modelo = mongoose.model('User', schema);


export {modelo}