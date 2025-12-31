import express from 'express';
import nodemailer from 'nodemailer';
const help = express.Router();
help.post('/help',async(req,res)=>{
    const{email,help} = req.body;
   try{ 
        const mailSender = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.COMPANYGMAIL,
            pass:process.env.PASSWORD
        }
    });
    await mailSender.sendMail({
           from: "servicestheforge@gmail.com",
           to: "servicestheforge@gmail.com",
           subject: "A Request from TheForge",
           text: `from ${email}: ${help}`
       })
    res.status(200).end();}
    catch(err){
        res.status(500).end();
    }
})
export default help;
