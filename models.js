import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    
    password: String,
    username: String,
    firstName: String,
    lastName: String,
    avatar:String,
    admin: Boolean
    
})


const cart_schema = new mongoose.Schema({
    
    user_id: String,
    products: Array
    
})

const products_schema = new mongoose.Schema({
    
    product_name: String,
    product_description: String,
    product_price: Number,
    product_imgUrl:String,
    product_stock: Number
    
})





const modelo = mongoose.model('User', schema);
const cart_model = mongoose.model('Cart', cart_schema);
const products_model = mongoose.model('Products', products_schema);




export {modelo, cart_model, products_model}