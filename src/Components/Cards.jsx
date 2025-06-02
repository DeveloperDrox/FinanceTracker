import React from "react";
import { motion } from "framer-motion";
import { BarChart2 } from "lucide-react";
function Cards({data,head,isMoney=false}) {
  return (
  <motion.div
  className="bg-gray-800 backdrop-blur-md shadow-lg rounded-xl border border-gray-700 p-4 w-80"
  whileHover={{y:-5,boxShadow:"0 20px 20px 10px rgba(0,,0,0,0)"}}
  >
    <div>
        <span className="flex items-center text-sm text-gray-500">
            <BarChart2
            size={20}
            />
            {head}
        </span>

        <p className="mt-1 text-3xl font-semibold text-gray-100">{isMoney?"$":""}{data}</p>
    </div>
  </motion.div>
  )
}

export default Cards;
