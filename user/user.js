import mongoose from "mongoose";
const schema = new mongoose.Schema({
    firstName:{type: String, required:true},
    surName:{type: String, required:true},
    email:{type: String, required:true},
    Password:{type: String, required:true},
    date:{type: Date, required:true},

},{timestamps:true});
export default mongoose.model("User",schema);