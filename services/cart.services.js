import { cartDao } from "../DAOS/cart.dao.js";

const add_cart = async (req, res) => {

    await cartDao.addCart(req,res)


}

const get_cart = async (req, res) => {
    const cart = await cartDao.getUserCart(req.session.passport.user)
  
    if(cart[0]){
    res.render('cart', {data: req.user, products: cart[0].products})
    }else{
    res.render('error', {data: 'No agregaste productos al carrito'})
  
    }}
  
  


export {
    add_cart,
    get_cart
}