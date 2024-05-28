import {Schema, model} from "mongoose";
import jwt from "jsonwebtoken"

const userSchema = Schema({
    number: {
        type: String,
        required: true
    }
}, {timestamp: true})

userSchema.methods.generateJWT = function(){
    const token = jwt.sign({
        _id: this._id,
        number: this.number
    }, process.env.JWT_ACCESS_KEY, {expiresIn: "30s"})
    return token
}

const user = model("user", userSchema)
export default user