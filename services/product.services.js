





const loadProduct = async (req, res) => {
    
    const product = await products_model.create(req.body)

    

    res.render('loaded')

    
}



export {
    loadProduct
}