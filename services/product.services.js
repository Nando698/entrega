import {productDao} from '../DAOS/products.dao.js'





const load_prod = async (req, res) => {
    
       const cart = await getUserCart(req.session.passport.user)
  
    if(cart[0]){
    res.render('cart', {data: req.user, products: cart[0].products})
    }else{
    res.render('error', {data: 'No agregaste productos al carrito'})
  
    }

    
}



export {
    load_prod
}