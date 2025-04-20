const mongoose = require("mongoose");


const connectDB = () => {
    try{
        mongoose.connect(process.env.MONGO_CONNECTION_URL).then( ()=> {
            console.log("MongoDB Connected Successfully");
        } )
    }catch(error){
        console.log("errror");

    }
}

module.exports = {connectDB};