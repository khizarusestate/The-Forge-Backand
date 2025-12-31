import express from "express";
import bcrypt from "bcrypt";
import User from "../user/user.js";
import nodemailer from 'nodemailer';
const app = express();
const signup = express.Router();
signup.post('/signup',async(req,res)=>{
    const {firstName,surName,email,password,date} = req.body;
    try {const exitingUserDetecter = await User.findOne({email});
    if(exitingUserDetecter)
       return res.status(409).end();
    const Password = await bcrypt.hash(password,10)
    const data_saver = new User({firstName,surName,email,Password,date});
    await data_saver.save();
    res.status(201).end();
    const transport = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:COMPANYGMAIL,
                pass:process.env.PASSWORD
            }
        })
     await transport.sendMail({
            from:"servicestheforge@gmail.com",
            to:email,
            subject:`Hi ${firstName}`,
            text:"Your Account was created!"
        })
    }
    catch(err){
        res.status(500).end();
    }
})
export default signup;
