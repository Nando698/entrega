import { Router } from "express";
import userController from '../controllers/user.controller.js'
import { auth } from "../services.js";
const router = Router()


router.get('/logOut', auth, userController.logOut)

router.get('/panel', auth, userController.adminPanel)

//No uso controller en los casos en los cuales solo se renderiza una view
router.get('/register', (req,res) => {res.render('register')})

router.get('/login-error', (req, res) => {res.render('login-error')})



  export default router