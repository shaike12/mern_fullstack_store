import Product from "../models/product.model.js";
// import Product from "../models/product.model.js"


export const createProduct = async (req, res) => {
    const product = req.body
    console.log(req.body);
    
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: 'Please Provide all fields' })
    }
    const newProduct = new Product(product)

    try { 
        await newProduct.save()
        res.status(201).json({ success: true, data: newProduct })
    } catch (error) {
        console.error("Error: ", error)
        res.status(500).json({ success: false, message: 'Server Error' })
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params
    const product = req.body

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id,      
            product,
            {
                new: true,
                runValidators: true
            }
        )
        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' })
        }
        res.status(200).json({ success: true, data: updatedProduct })
    }
    catch (error) {
        console.error("Error: ", error)
        res.status(500).json({ success: false, message: 'Server Error' })
    }
}       

export const deleteProduct = async (req, res) => {
    const { id } = req.params
    console.log(id);
    
    try {
        const deletedProduct = await Product.findByIdAndDelete(id)
        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' })
        }
        res.status(200).json({ success: true, data: deletedProduct })
    } catch (error) {
        console.error("Error: ", error)
        res.status(500).json({ success: false, message: 'Server Error' })
    }
}       

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json({ success: true, data: products })
    } catch (error) {
        console.error("Error: ", error)
        res.status(500).json({ success: false, message: 'Server Error' })
    }
}


 

