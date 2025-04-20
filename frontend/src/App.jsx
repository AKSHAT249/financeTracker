import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Home from "./components/Home";
import AddTransaction from './pages/AddTransaction';
import Dashboard from './pages/Dashboard';
import Transaction from "./pages/Transaction";
import Chart from "./pages/Chart";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index path="dashboard" element={<Dashboard />} />
          <Route  path="transaction" element={<Transaction />} />
          <Route  path="newtransaction" element={<AddTransaction />} />
          <Route  path="chart" element={<Chart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App