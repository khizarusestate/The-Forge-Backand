import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import signup from '../routes/signup.js'
import login from '../routes/login.js'
import help from '../routes/help.js'
import serverlessHttp from 'serverless-http'
const app = express();
app.use(cors({
    origin:"https://the-forge-frontend-rho.vercel.app",
    allowedHeaders:"Content-Type",
    methods:"POST"
}))
app.use(express.json());
app.use('/auth',signup);
app.use('/auth',login);
app.use('/route',help);
mongoose.connect(process.env.MONGOURL)
.then(()=>{console.log("DataBase Connected Successfully")})
.catch(()=>{console.log("DataBase Connection Error")})
export default serverlessHttp(app);