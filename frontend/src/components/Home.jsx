import React, {useState, useEffect} from 'react';
import axios from "axios";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";



const Home = () => {

    

   


  return (
    <div className="">

        <div className="flex flex-row w-full">
            <div className="w-1/5 ">
                <Sidebar />   
            </div>
            

            <div className="w-4/5 relative">
                <Outlet />    
            </div>
        </div>


        
    </div>
  )
}

export default Home