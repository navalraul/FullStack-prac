import UserModel from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


export const Register = async (req, res) => {
    try{
        const { name, email, password, role, number } = req.body.userData;

        if(!name || !email || !password || !role || !number) return res.json({ success: false, message: "All fields are mandatory..."})

        const isEmailExist = await UserModel.find({email})
        if(isEmailExist.length) {
            return res.json({ success: false , message: "Email already exist.."})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new UserModel ({ name, email, password: hashedPassword, role, number});

        await user.save();
        return res.json({success: true, message: "Register successfull..."})


    } catch(error) {
        return res.json({ success: false, message: error});
    }
}


export const Login = async (req, res) => {
    try{

        const { email, password} = req.body.userData;

        if(!email || !password) return res.json({ success: false, message: "All fields are mandatory.."})

        const user = await UserModel.findOne({email})
        if(!user) return res.json({success: false, message: "User not found!"})

        if(user.isBlocked) {
            return res.json({success: false, message: "You have been blocked.."})
        }

        const isPasswordRight = await bcrypt.compare(password, user.password)
        
        if(isPasswordRight) {
            const userObject = {
                name: user?.name,
                email: user?.email,
                number: user?.number,
                role: user?.role,
                _id: user?._id
            }
            const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET)
            return res.json({ success: true, message: "Login success", user: userObject, token: token})
        }

        return res.json({ success: false, message: "Password is wrong...."})

    } catch (error) {
        return res.json({success: false, message: error})
    }
}