import React, { useState, useEffect } from 'react';
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState({ _id: '', amount: '', description: '', categories: '' });

  const ITEMS_PER_PAGE = 4;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const response = await axios.get("http://localhost:4000/api/transaction/");
    setTransactions(response.data.data || []);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/transaction/${id}`);
      alert("Transaction deleted successfully");
      fetchTransactions();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const handleEditClick = (transaction) => {
    setEditData(transaction);
    setShowModal(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:4000/api/transaction/${editData._id}`, editData);
      setShowModal(false);
      fetchTransactions();
      alert("Transaction updated!");
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE);

  return (
    <div className="bg-gray-100 h-full">
      <div className="sticky bg-white top-0 w-full h-[80px] shadow-lg flex flex-row justify-end items-center p-8 gap-4">
        <p className="text-xl text-gray text-semibold">Welcome Henry</p>
      </div>

      <div className="p-8 flex flex-col gap-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-2xl font-semibold">Transaction's List</h2>
        </div>

        <div className="shadow-lg bg-white rounded-md p-8 flex flex-col gap-8">
          {
            transactions.length > 0 && (
              <>
                <table className="w-full">
                  <thead className="bg-black">
                    <tr>
                      <th className="text-md text-white text-left p-4">S. No.</th>
                      <th className="text-md text-white text-left p-4">Amount</th>
                      <th className="text-md text-white text-left p-4">Description</th>
                      <th className="text-md text-white text-left p-4">Category</th>
                      <th className="text-md text-white text-left p-4">Date & Time</th>
                      <th className="text-md text-white text-left p-4">Edit</th>
                      <th className="text-md text-white text-left p-4">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      transactions
                        .slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
                        .map((transaction, index) => {
                          const serialNo = (currentPage - 1) * ITEMS_PER_PAGE + index + 1;
                          return (
                            <tr key={transaction._id} className="border-b">
                              <td className="text-md p-4">{serialNo}</td>
                              <td className="text-md p-4">{transaction.amount}</td>
                              <td className="text-md p-4">{transaction.description}</td>
                              <td className="text-md p-4">{transaction.categories}</td>
                              <td className="text-md p-4">{new Date(transaction.createdAt).toLocaleString()}</td>
                              <td className="text-md p-4">
                                <button onClick={() => handleEditClick(transaction)}><FaRegEdit className="w-5 h-5 hover:text-blue-500" /></button>
                              </td>
                              <td className="text-md p-4">
                                <button onClick={() => handleDelete(transaction._id)}><MdOutlineDeleteOutline className="w-5 h-5 hover:text-red-500" /></button>
                              </td>
                            </tr>
                          );
                        })
                    }
                  </tbody>
                </table>

                {/* Pagination */}
                <div className="flex justify-center mt-6">
                  <button
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-200 mr-2 rounded disabled:opacity-50"
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    Previous
                  </button>
                  <p className="px-4 py-2 border">{currentPage}</p>
                  <button
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-200 ml-2 rounded disabled:opacity-50"
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next
                  </button>
                </div>
              </>
            )
          }
        </div>

        {/* Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Edit Transaction</h2>
              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={editData.amount}
                onChange={handleChange}
                className="w-full mb-3 px-4 py-2 border rounded"
              />
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={editData.description}
                onChange={handleChange}
                className="w-full mb-3 px-4 py-2 border rounded"
              />
              <select
                name="categories"
                value={editData.categories}
                onChange={handleChange}
                className="w-full mb-4 px-4 py-2 border rounded"
              >
                <option value="">Select Category</option>
                <option value="Food">Food</option>
                <option value="Groceries">Groceries</option>
                <option value="Transportation">Transportation</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Shopping">Shopping</option>
                <option value="Other">Other</option>
              </select>
              <div className="flex justify-end gap-4">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
                <button onClick={handleUpdate} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Update</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Transaction;
