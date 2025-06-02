import React, { useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import { motion } from "framer-motion";
import Input from "../Components/Input";
import { useState } from "react";
import { axiosInstance } from "./../lib/axiosInstance.js";
function TransitionForm() {
  const [userData, setUserData] = useState({
    isLoading: false,
    data: null,
  });
  const [allCategory, setallCategory] = useState({
    isLoading: false,
    data: null,
  });

  const handleData = (e) => {
    setUserData((curr) => {
      return { ...curr, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.post("/api/transition", userData);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axiosInstance.get("/api/category");
      setallCategory((curr) => {
        return { ...curr, data: data.data };
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);
  return (
    <>
      <Sidebar />
      <div className="flex-1 ">
        <Header />
        <div className="flex items-center justify-center h-full">
          <div className="bg-gray-700 shadow-lg rounded-xl px-6 border border-gray-600 w-120 py-12">
            <h2 className="text-xl font-semibold text-gray-100 text-center mb-10">
              Add Transition
            </h2>
            <form
              className="grid grid-col-2 grid-row-5 gap-5"
              onSubmit={handleSubmit}
            >
              <div className="col-span-2 ">
                <label
                  htmlFor="category"
                  className="text-sm font-semibold text-gray-100"
                >
                  Trnsitioin Category
                </label>
                <br />
                <select
                  name="category"
                  id="category"
                  onChange={handleData}
                  required
                  className=" w-full pl-3 pr-3 py-2 bg-gray-800  rounded-lg border-gray-700 border focus:border-green-500 focus:ring-2 focus:ring-green-500 transition-all text-white '"
                >
                  {allCategory.data?.map((curr) => {
                    return (
                      
                        <option key={curr._id} value={curr.name.toLowerCase()}>
                          {curr.name}
                        </option>
                     
                    );
                  })}
                </select>
              </div>

              <div className=" ">
                <label
                  htmlFor="paymentMethod"
                  className="text-sm font-semibold text-gray-100"
                >
                  Payment Method
                </label>
                <br />
                <select
                  name="paymentMethod"
                  onChange={handleData}
                  className=" w-full pl-3 pr-3 py-2 bg-gray-800  rounded-lg border-gray-700 border focus:border-green-500 focus:ring-2 focus:ring-green-500 transition-all text-white '"
                >
                  <option value="card">Card</option>
                  <option value="upi">Upi</option>
                  <option value="cash">Cash</option>
                </select>
              </div>
              <div className=" ">
                <label
                  htmlFor="amount"
                  className="text-sm font-semibold text-gray-100"
                >
                  Amount
                </label>
                <br />
                <input
                  type="number"
                  onChange={handleData}
                  name="amount"
                  min={1}
                  className="w-full pl-3 pr-3 py-2 bg-gray-800 opacity-70 rounded-lg border-gray-700 border focus:border-green-500 focus:ring-2 focus:ring-green-500 transition-all text-white placeholder-gray-400"
                />
              </div>
              <div className=" ">
                <label
                  htmlFor="paymentType"
                  className="text-sm font-semibold text-gray-100"
                >
                  Payment Type
                </label>
                <br />
                <select
                  name="paymentType"
                  onChange={handleData}
                  id="paymentType"
                  className=" w-full pl-3 pr-3 py-2 bg-gray-800  rounded-lg border-gray-700 border focus:border-green-500 focus:ring-2 focus:ring-green-500 transition-all text-white '"
                >
                  <option value="credit">Credit</option>
                  <option value="debit">Debit</option>
                </select>
              </div>
          
              <motion.button
                className="col-span-2 mt-5 bg-gradient-to-r from-green-500 to-emerald-600 text-center font-semibold text-white py-2 rounded-2xl shadow-lg cursor-pointer focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-600"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
              >
                Add Transition
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default TransitionForm;
