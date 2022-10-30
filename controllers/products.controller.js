import { productDao } from "../DAOS/products.dao.js";



const getAllProducts = async (req, res) => {
    if (req.user) {
        const product_list = await productDao.getProducts()
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

    res.render('info', {msj: "Producto agregado!"})

}

const updatePanel = async (req, res) => {

    const product_list = await productDao.getProducts()

    res.render('updateProduct', {data: product_list})


}

const updateProduct = async (req, res) => {
    
    

    await productDao.updateProduct(req, res)

    res.render('info', {msj: "Producto modificado!"})


}

const deleteProduct = async (req, res) => {

    await productDao.del_prod(req, res)

    res.render('info', {msj: "Producto eliminado"})

}


export default {
    getAllProducts,
    loadProduct,
    updateProduct,
    updatePanel,
    deleteProduct
}