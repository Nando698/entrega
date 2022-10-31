import {products_model} from "../models.js";


const getProducts = async () => {
  const allProducts = await products_model.find()

  return allProducts
}



const load_p = async (req, res)=> {

  const product = await products_model.create(req.body)

}




const getSomeProducts = async (products) => {


  return await products_model.find({
    '_id': {$in: products}
  })

}






const updateProduct = async (req, res)=> {
  
  const fieldsArray = Object.entries(req.body)
  const filtered = fieldsArray.filter(([key, value]) => value != "")
  const fields = Object.fromEntries(filtered)


  const {product_name,
    product_description,
    product_price,
    product_imgUrl,
    product_stock,
    id} = req.body
  
  const updatedP = await products_model.updateOne({_id : id}, {$set: fields})

}

const del_prod = async (req, res) => {
  const deleted = await products_model.deleteOne({_id: req.body.id})

}



export const productDao = {
load_p,
getProducts,
updateProduct,
del_prod,
getSomeProducts
};