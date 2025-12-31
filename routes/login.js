import express from 'express';
import bcrypt from 'bcrypt'
import User from '../user/user.js';
import jwt from 'jsonwebtoken'
const login = express.Router();
login.post('/login',async(req,res)=>{
    const {email,password} = req.body;
   try {    
    const dataValider = await User.findOne({email});
    if(!dataValider)
        return res.status(404).end();
    const passwordValidater = await bcrypt.compare(password,dataValider.Password);
    if(!passwordValidater)
        return res.status(401).end();
    else
       {
         const token = jwt.sign(
                                { email,password},
                                  process.env.JWT,
                                  {expiresIn:"1d"})
         return res.status(200).json({token});  
       }}
    catch (err){
        res.status(500).end();
    }
   
})
export default login;