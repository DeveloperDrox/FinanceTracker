import React from 'react'
import { motion } from "framer-motion"
const FloatingCircle = ({size,left,top}) => {
  return (
    <motion.div className={`absolute rounded-full bg-emerald-400 ${size} opacity-20 blur-xl `}
    animate={{
        x:["0%","100%","0%"],
        y:["0%","100%","0%"],
        opacity:["5%","50%","0%"]

    }}
    transition={{
        duration:20,
        repeat:Infinity,
        ease:"linear"
    }}

    style={{
        left:`${left}%`,
         top:`${top}%`
    }}
    />

  )
}

export default FloatingCircle
