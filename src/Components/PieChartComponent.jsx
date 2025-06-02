import React from 'react'
import {motion } from "framer-motion"
import {  Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts'
import { useState } from 'react';
import { axiosInstance } from '../lib/axiosInstance';
import { useEffect } from 'react';

const data=[
    {
      name:"Jan",
      value:100,
    },
    {
      name:"Feb",
      value:1020,
    },
    {
      name:"Mar",
      value:1001,
    },
    {
      name:"April",
      value:5100,
    },
    {
      name:"Ma7",
      value:1100,
    },
  
    
  ]
function PieChartComponent() {

   const [category, setCategory] = useState({
      isLoading: false,
      data: null,
    });
  
    const getData = async () => {
     
      setCategory((curr) => {
        return { ...curr, isLoading: true };
      });
  
      try {
        const { data } = await axiosInstance.get("/api/transition/total?id=category");
        setCategory((curr) => {
          return { ...curr, data: data.data };
        });
      } catch (error) {
        console.log(error);
      } finally {
        setCategory((curr) => {
          return { ...curr, isLoading: false };
        });
      }
    };

    useEffect(()=>{
      getData()
    },[])
  return (
    <motion.div
   className='bg-gray-700 shadow-lg rounded-xl p-6 border border-gray-600 '
    initial={{opacity:0,y:20}}
    animate={{opacity:1,y:0}}
    transition={{duration:.5}}
    >
      <h2 className='text-lg font-semibold text-gray-100'>Category Overview</h2>

      <div className='h-80'>
        <ResponsiveContainer>
            <PieChart>
                <Pie
                data={category.data}
                cx={"50%"}
                cy={"50%"}
                labelLine={false}
                fill='#8884d8'
                dataKey={"count"}
                label={({_id,percent})=> `${_id} ${(percent*100).toFixed()}%`}
                />
              
            </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}

export default PieChartComponent
