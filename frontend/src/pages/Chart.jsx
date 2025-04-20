import React, {useState, useEffect} from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar, Legend } from 'recharts';
const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}];
import axios from "axios";

const Chart = () => {

    const [transactions, setTransactions] = useState([]);




    useEffect(() => {
        fetchTransactions();
    }, []);
    
    const fetchTransactions = async () => {
    const response = await axios.get("http://localhost:4000/api/transaction/");
    setTransactions(response.data.data || []);
    };
  return (
    <div className="flex items-center justify-center max-container h-full">
        <h1 className='text-lg font-semibold'>Daily Expenses</h1>
        { (transactions && transactions.length>0) && <BarChart width={730} height={250} data={transactions}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="createdAt" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#8884d8" />
            
        </BarChart>}
    </div>
  )
}

export default Chart




