import UserModel from "../Models/UserModel.js";
import jwt from "jsonwebtoken"



export const checkSeller = async (req, res, next) => {
    try{
        const { token } = req.body;

        if(!token) return res.status(404).json({ success: false, message: "Token is mandatory"})

        const decodedData = jwt.verify(token, process.env.JWT_SECRET)

        if(!decodedData) {
            return res.status(404).json({ success: false, message: "Token not valid"})
        }

        const userId = decodedData.userId;

        const user = await UserModel.findById(userId);

        if(!user || user?.role != "Seller") {
            return res.status(404).json({ message: "User is not valid to add product", status: "error"})
        }

        next();

    } catch (error) {
        res.status(500).json({error: error.message, status: "error from middleware"})
    }
}