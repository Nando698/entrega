import { cartDao } from "../DAOS/cart.dao.js";
import { productDao } from "../DAOS/products.dao.js";



const getCart = async (req, res) => {

    const cart = await cartDao.getUserCart(req.session.passport.user)
  

    const products = await productDao.getSomeProducts(cart[0].products)
    
    console.log('productss',  products)
    
    if (cart[0]) {
        res.render('cart', {
            data: req.user,
            products: products,
            cart: cart[0].id
        })
    } else {
        res.render('error', {
            data: 'No agregaste productos al carrito'
        })

    }
}

const addCart = async (req, res) => {

    await cartDao.addCart(req, res)

}

const deleteProduct = async (req, res) => {

    const cart = await cartDao.deleteProductFromCart(req, res)

    res.render('deleted')
}

export default {
    getCart,
    addCart,
    deleteProduct
}