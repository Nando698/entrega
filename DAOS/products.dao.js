import {products_model} from "../models.js";


const getProducts = async () => {
  const allProducts = await products_model.find()

  return allProducts
}



const load_p = async (req, res)=> {
  const product = await products_model.create(req.body)

    

  res.render('loaded')
}




export const productDao = {
load_p,
getProducts
};