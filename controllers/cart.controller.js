import { cartDao } from "../DAOS/cart.dao.js";
import { productDao } from "../DAOS/products.dao.js";



const getCart = async (req, res) => {

    const cart = await cartDao.getUserCart(req.session.passport.user)
    console.log('asdasdas', cart)
    
    
    
    
    if (cart[0]) {
        const products =  await productDao.getSomeProducts(cart[0].products)
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

    const product = await cartDao.addCart(req, res)

    res.render('added', {product})

}

const deleteProduct = async (req, res) => {

    const cart = await cartDao.deleteProductFromCart(req, res)

    res.render('info', {msj: "Producto eliminado"})
}

export default {
    getCart,
    addCart,
    deleteProduct
}