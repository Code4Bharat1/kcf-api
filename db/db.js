import mongoose from "mongoose";



const connectDB = async() => {
    try {
        
        await mongoose.connect("mongodb://127.0.0.1:27017/kcf_db")
        console.log("ConnectedDB☑️")
    } catch (error) {
        console.log(error)
    }
}



export default connectDB;