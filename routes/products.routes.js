import { Router } from "express";
import productsController from "../controllers/products.controller.js";
import { isAdmin } from "../services.js";

const router = Router();

router
  .route("/")
  .get(productsController.getAllProducts)
  

  
  router
  .route('/load-product')
  .get(isAdmin ,(req,res) => {res.render('loadProduct')})
  .post(isAdmin, productsController.loadProduct)

  router
  .route('/update-product')
  .get(isAdmin ,productsController.updatePanel)
  .post(isAdmin, productsController.updateProduct)

  router
  .route('/delete-product')
  .post(isAdmin, productsController.deleteProduct)

export default router;