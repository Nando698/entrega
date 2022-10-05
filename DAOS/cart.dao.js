import {cart_model, products_model} from "../models.js";


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

const getUserCart = async (id) => {
    
    const userCart = await cart_model.find({user_id : id})

    return userCart
}

const deleteProductFromCart = async (req, res) => {
    
    let cart = await cart_model.findById(req.params.cartId)
    
    let index = cart.products.findIndex(p => p._id == req.params.prodId)

    cart.products.splice(index, 1)

        
    let updated_cart = await cart_model.updateOne({_id: req.params.cartId}, {$set:{products : cart.products}})

  };

export const cartDao = {
    addCart,
    getUserCart,
    deleteProductFromCart

}