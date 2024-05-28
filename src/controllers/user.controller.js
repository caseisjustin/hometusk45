import bcrypt from "bcrypt"
import axios from "axios"
import otpGenerator from "otp-generator"

import User from "../models/user.model.js"
import Otp from "../models/otp.model.js"

export const signUp = async (req, res) => {
    try {
        const user = await User.findOne({
            number: req.body.number
        });
        if(user){ return res.status(400).send("User already registered")}
        const OTP = otpGenerator.generate(4, {digits: true, lowerCaseAlphabets:false, upperCaseAlphabets: false, specialChars: false})
        const number = req.body.number;
        console.log(OTP);

        const otp = new Otp({number: number, otp: OTP});
        const salt = await bcrypt.genSalt(10)
        otp.otp = await bcrypt.hash(otp.otp, salt);
        await otp.save()
        res.status(200).send("Otp sent successtully")
    } catch (err) {
        res.send('err')
    }
}

export const verifyOtp = async (req, res) => {
    try {
        const otpHolder = await Otp.find({
            number: req.body.number
        });
        if(otpHolder.length === 0) return res.status(400).send("You use an Exprired OTP!");
        const rightOtpFind = otpHolder[0];
        console.log(rightOtpFind, otpHolder)
        const validUser = await bcrypt.compare(req.body.otp, rightOtpFind.otp)
        if(rightOtpFind.number === req.body.number && validUser){
            const user = new User({...req.body});
            const token = user.generateJWT();
            const result = await user.save();
            const OTPDelete = await Otp.deleteMany({
                number: rightOtpFind.number
            })
            return res.status(200).send({
                message: "User Registration successfull",
                token: token,
                data: result
            })
        }
        else {
            return res.status(400).send("Your otp was wrong")
        }
    } catch (err) {
        console.log("d")
        res.send("err")
    }
}