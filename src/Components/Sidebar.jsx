import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { BarChart2, DollarSign, Menu, Settings } from "lucide-react";
import { Link } from "react-router-dom";
function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <motion.div
      className={`relative z-10 transition-all h-screen ${
        isSidebarOpen ? "w-80" : "w-20"
      }`}
      animate={{ width: isSidebarOpen ? 256 : 80 }}
    >
      <div className="h-full bg-gray-800 flex flex-col p-4 border-r border-gray-700 backdrop-blur-md text-white">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-full hover:bg-gray-700 max-w-fit "
        >
          <Menu size={24} />
        </motion.button>
        <nav>
          <Link to={"/"}>
            <motion.div className="flex items-center justify-center p-4 hover:bg-gray-700 rounded-lg">
              <BarChart2 color="#6366f1" />
              <AnimatePresence>
                {isSidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="ml-4 whitespace-nowrap"
                  >
                    Overview
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </Link>

          <Link to={"/addtransition"}>
            <motion.div className="flex items-center justify-center p-4 hover:bg-gray-700 rounded-lg">
              <DollarSign size={20} color="green" />
              <AnimatePresence>
                {isSidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="ml-4 whitespace-nowrap"
                  >
                    Add Transition
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </Link>

          <Link to={"/transition"}>
            <motion.div className="flex items-center justify-center p-4 hover:bg-gray-700 rounded-lg">
              <DollarSign size={20} color="green" />
              <AnimatePresence>
                {isSidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="ml-4 whitespace-nowrap"
                  >
                    Transition Detail
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </Link>
          <Link to={"/category"}>
            <motion.div className="flex items-center justify-center p-4 hover:bg-gray-700 rounded-lg">
              <DollarSign size={20} color="green" />
              <AnimatePresence>
                {isSidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="ml-4 whitespace-nowrap"
                  >
                    Category
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </Link>

          <Link to={"/setting"}>
            <motion.div className="flex items-center justify-center p-4 hover:bg-gray-700 rounded-lg">
              <Settings size={20} color="gray" />
              <AnimatePresence>
                {isSidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="ml-4 whitespace-nowrap"
                  >
                    Setting
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </Link>
        </nav>
      </div>
    </motion.div>
  );
}

export default Sidebar;
