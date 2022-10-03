import { productDao } from "../DAOS/products.dao.js";
import { Router } from "express";

const router = Router()
const product_list = await productDao.getProducts()


const getAllProducts = (req, res) => {
    if (req.user) {
        console.log('req session user', req.session.passport)
        res.render('index', {
            data: req.user,
            products: product_list
        })

    } else {
        res.render('index', {
            data: undefined,
            products: undefined
        })

    }
}

const loadProduct = async (req, res) => {
    
    await productDao.load_p(req, res)


}


export default {
    getAllProducts,
    loadProduct
}