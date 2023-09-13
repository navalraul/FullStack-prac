
import jwt from "jsonwebtoken";
import ProductModel from "../Models/ProductModel.js";



export const addProduct = async (req, res) => {
    try{
        const { name, price, image, category} = req.body.productData;
        const { token } = req.body;

        if(!name || !price || !image || !category || !token) return res.status(404).json({success: false, message: "All fields are mandatoery..."}) 

        const decodedData = jwt.verify(token, process.env.JWT_SECRET)

        if(!decodedData) {
            return res.status(404).json({ success: false, message: "Token not valid"})
        }

        const userId = decodedData.userId;

        const product = new ProductModel({ name, price, image, category, userId: userId});

        await product.save();

        return res.status(201).json({ success: true, message: "Product added successfull"})

    } catch(error) {
        res.status(500).json({success: false, message: error})
    }
}