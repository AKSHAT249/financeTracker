
const {Transaction} = require("../models/transaction.js");

const getTransaction = async (req, res) => {
    try{
        // return res.json({message:"efqno"})
        const data = await Transaction.find();
        return res.status(200).json({data});
    }catch(error){
        console.log(error.message);
        return res.status(500).json({message:"error in getTransaction controller"});
    }

}
const addTransaction = async (req, res) => {
    console.log(req.body);

    const {amount, description, categories } = req.body;

    try{
        const data = await Transaction.create({amount, description, categories});

        return res.status(201).json({data});

    }catch(error){
        return res.status(500).json({message:"error in addTransaction controller"});
    }

}
const updateTransaction = async (req, res) => {

    const {amount, description, categories } = req.body;
    const {id} = req.params;

    try{
        const entry = await Transaction.findByIdAndUpdate({_id:id}, {amount, description, categories});

        entry.save();



        return res.status(201).json({entry});

    }catch(error){
        console.log(error.message);
        return res.status(500).json({message:"error in updateTransaction controller"});
    }

}
const deleteTransaction = async (req, res) => {

    
    const {id} = req.params;

    try{
        const entry = await Transaction.findByIdAndDelete({_id:id});

        

        return res.status(201).json({entry, message:"Deleted Successfully"});

    }catch(error){
        return res.status(500).json({message:"error in deleteTransaction controller"});
    }

}


module.exports = {getTransaction, addTransaction, updateTransaction, deleteTransaction };