import { Router } from "express";
import cartController from "../controllers/cart.controller.js";
import {isLogged} from '../services.js'
const router = Router()

router
  .route("/")
  .get(isLogged, cartController.getCart)



router
  .route('/:id')
  .post(isLogged, cartController.addCart)

router
  .route('/:cartId/:prodId')
  .get(cartController.deleteProduct)


  export default router