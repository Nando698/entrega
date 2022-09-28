import {modelo, cart_model, products_model} from '../models.js'
import {load_prod} from '../services/product.services.js'
import { add_cart, get_cart } from '../services/cart.services.js'

const loadProduct = async (req, res) => {
    
        await load_prod(req, res)

    
}


const getProducts = async () => {
    const allProducts = await products_model.find()

    return allProducts
}


const addCart = async (req, res) => {

    await add_cart(req, res)

}

const getCart = async (req, res) => {

    await get_cart(req, res)

}


const logOut = (req, res) => {
    let user = req.session.user
    req.session.destroy()
    res.render('bye', {data: user})
   
      
  }

export {loadProduct, getProducts, addCart, getCart, logOut}