import mongoose, {Schema} from "mongoose";

const userSchema = new Schema ({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        enum: ['Buyer', 'Seller', 'Admin'],
        default: "Buyer"
    },
    isNumberVerified: {
        type: Boolean,
        default: false,
    },
    cart: {
        type: [String]
    },
    whishlist: {
        type: [String]
    },
    isBlocked: {
        type: Boolean,
        default: false,
    }

})

export default mongoose.model("User", userSchema)