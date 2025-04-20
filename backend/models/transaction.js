const mongoose = require("mongoose");


const transactionSchema = new mongoose.Schema({
    amount:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    description:{
        type:String
    },
    categories:{
        type:String,
        enum:['Food','Groceries','Transportation','Entertainment','Shopping','Other'],
        default:'Other'
    }
});


const Transaction = mongoose.model('Transaction', transactionSchema);


module.exports = {Transaction};