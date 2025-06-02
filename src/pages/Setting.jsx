import React from 'react'
import Sidebar from '../Components/Sidebar'
import Header from '../Components/Header'
import {  useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { axiosInstance } from '../lib/axiosInstance'

function Setting() {
 const navigate=useNavigate()
 const handleButton=()=>{
    navigate("/editProfile")
 }

 const handleLogOut=async () => {
  try {
    await axiosInstance.get("/api/user/logout")
    navigate("/login")
  } catch (error) {
    console.log(error)
  }
 }
    return (

    <>
    <Sidebar/>
    <div className='flex-1'>
      <Header/>
      <main className='py-5 px-5  '>
       

         <div className=' bg-red-900 opacity-90 backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-600 w-200 m-auto my-10'>
            <h1 className="text-xl mb-5 font-semibold text-white ">Log Out</h1>
          
             <motion.button
            className="w-30 mt-5 bg-gradient-to-r from-red-500 to-red-800 text-center font-semibold text-white py-2 rounded-2xl shadow-lg cursor-pointer focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-600"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogOut}
          >
            LogOut
            
          </motion.button>
        </div>
      </main>
    </div>
    </>
  )
}

export default Setting
