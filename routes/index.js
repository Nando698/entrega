import { Router } from "express";
import { auth, isAdmin} from '../services.js';
import {loadProduct, getProducts, addCart, getUserCart} from '../controllers/index.js'

const product_list = await getProducts()


let router = Router()



router.get('/', (req, res) => {
    if(req.user){
      console.log('req session user', req.session.passport)
      res.render('index', {data : req.user.firstName, products: product_list})
      console.log(req.session.passport)
    }else{
      res.render('index', {data:undefined, products: undefined})

    }
})


router.post('/carrito/:id', addCart)

router.get('/carrito', async (req, res) => {
  const cart = await getUserCart(req.session.passport.user)
  res.render('cart', {data: req.user.firstName, products: cart[0].products})
})

router.get('/logOut', auth, (req, res) => {
  let user = req.session.user
  req.session.destroy()
  res.render('bye', {data: user})
 
    
})

router.get('/register', (req,res) => {
  res.render('register')
})

router.get('/load-product',isAdmin ,(req,res) => {
  res.render('loadProduct')
} )


router.post('/load-product', loadProduct)



router.get('/error', (req, res) => {
  res.render('error', {data: 'error'})
})

router.get('/login-error', (req, res) => {
  res.render('login-error')
})




  




router.get('*', (req,res) => {
  res.render('error', {data: 'Error 404 not found'})
})






export default router