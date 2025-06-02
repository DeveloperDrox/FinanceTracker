import React from "react";
import { motion } from "framer-motion";
import { Bar, BarChart, Legend, ResponsiveContainer, XAxis } from "recharts";


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
function BarChartComponent() {
  return (
    <motion.div
      className="bg-gray-700 shadow-lg rounded-xl p-6 border border-gray-600 "
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
        <div className="h-80">
            <ResponsiveContainer>
                <BarChart data={data}>
                    <XAxis dataKey={"name"} />
                    <Bar dataKey={"value"}/>
                    <Legend/>
                </BarChart>
            </ResponsiveContainer>
        </div>

    </motion.div>
  );
}

export default BarChartComponent;
