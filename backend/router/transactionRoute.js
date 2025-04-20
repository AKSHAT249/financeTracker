const express = require("express");
const {getTransaction, addTransaction, updateTransaction, deleteTransaction } = require("../controller/transactionController.js");

const router = express.Router();

router.get("/transaction", getTransaction );
router.post("/transaction", addTransaction );
router.put("/transaction/:id", updateTransaction );
router.delete("/transaction/:id", deleteTransaction );

module.exports = router;