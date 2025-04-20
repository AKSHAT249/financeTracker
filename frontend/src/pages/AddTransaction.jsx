import React, {useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const AddTransaction = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        amount: '',
        description: '',
        categories: 'Other',
    });

    const categories = ['Food', 'Groceries', 'Transportation', 'Entertainment', 'Shopping', 'Other'];

    const handleChange = (e) => {
        setFormData({ 
          ...formData, 
          [e.target.name]: e.target.value 
        });
      };
    
      const handleSubmit =async (e) => {
        e.preventDefault();
        console.log("Submitted Data:", formData);

        const URL = "https://financetracker-6s07.onrender.com";

        // const response = await axios.post("http://localhost:4000/api/transaction/",formData);
        const response = await axios.post(`${URL}/api/transaction/`,formData);

        alert("Data Added Successfully");
        navigate("/transaction");
        
      };

  return (

    <div className="max-container h-full bg-white flex justify-center items-center">
        <form 
        onSubmit={handleSubmit} 
        className="bg-gray-100 p-8 rounded-lg shadow-md w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Add Transaction</h2>

        <div className="flex flex-col">
          <label className="mb-1 font-medium" htmlFor="amount">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2"
            placeholder="Enter amount"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium" htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2"
            placeholder="Enter description"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium" htmlFor="category">Category</label>
          <select
            name="categories"
            value={formData.categories}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2"
            required
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Add Transaction
        </button>
      </form>

    </div>
  )
}

export default AddTransaction