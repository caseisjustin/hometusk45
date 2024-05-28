import {Schema, model} from "mongoose";
const otpSchema = Schema({
    number: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    craetedAt: {
        type: Date,
        default: Date.now,
        index: {expires: 120}
    }
}, {timeStamp: true})

const otp = model("Otp", otpSchema)
export default otp