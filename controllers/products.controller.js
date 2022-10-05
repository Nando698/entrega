import { productDao } from "../DAOS/products.dao.js";
import { Router } from "express";

const router = Router()
const product_list = await productDao.getProducts()


const getAllProducts = (req, res) => {
    if (req.user) {
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