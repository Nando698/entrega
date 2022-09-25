import {modelo, cart_model, products_model} from '../models.js'
import { sendMail } from '../services.js'
import {loadProduct} from '../services/product.services.js'

const loadProduct = async (req, res) => {
    
    const product = await products_model.create(req.body)

    

    res.render('loaded')

    
}


const getProducts = async () => {
    const allProducts = await products_model.find()

    return allProducts
}

const getUserCart = async (id) => {
    
    const userCart = await cart_model.find({user_id : id})

    return userCart
}






const addCart = async (req, res) => {

    const existingCart = await cart_model.findOne({user_id : req.session.passport.user})
    const product = await products_model.findOne({_id: req.params.id})

    if(existingCart){
        existingCart.products.push(product)
        await existingCart.save()
        res.render('added', {product})
       
    }else{
        const newCart = new cart_model({user_id: req.session.passport.user, products: product})
        await newCart.save()

        res.render('added', {product})

    }

}




export {loadProduct, getProducts, addCart, getUserCart}