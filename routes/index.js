import { Router } from "express";
import { auth, isAdmin} from '../services.js';
import {loadProduct, getProducts, addCart, getUserCart} from '../controllers/index.js'
import { sendMail } from "../services.js";


const product_list = await getProducts()


let router = Router()



router.get('/', (req, res) => {
    if(req.user){
      console.log('req session user', req.session.passport)
      res.render('index', {data : req.user, products: product_list})
      
    }else{
      res.render('index', {data:undefined, products: undefined})

    }
})


router.post('/carrito/:id', addCart)

router.get('/carrito', async (req, res) => {
  const cart = await getUserCart(req.session.passport.user)

  if(cart[0]){
  res.render('cart', {data: req.user, products: cart[0].products})
  }else{
  res.render('error', {data: 'No agregaste productos al carrito'})

  }

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


router.post('/load-product', isAdmin, loadProduct)



router.get('/error', (req, res) => {
  res.render('error', {data: 'error'})
})

router.get('/login-error', (req, res) => {
  res.render('login-error')
})

router.post('/sendOrder', async (req, res) => {
  await sendMail(process.env.MAIL, `Pedido de: ${req.user.username}`, `Nuevo pedido:
  ${req.body.prueb}`)
  console.log('sending' , req.user.firstName)
  res.redirect('/')
})


  




router.get('*', (req,res) => {
  res.render('error', {data: 'Error 404 not found'})
})






export default router