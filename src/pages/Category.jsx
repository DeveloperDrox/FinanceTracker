import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import { axiosInstance } from "../lib/axiosInstance";
import { motion } from "framer-motion";
import { DeleteIcon } from "lucide-react";

function Category() {
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
      const { data } = await axiosInstance.post("/api/category",userData);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    finally{
        getAllCategory()
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axiosInstance.get("/api/category");
      setallCategory((curr) => {
        return { ...curr, data: data.data };
      });
    } catch (error) {
      console.log(error);
    }
  };

    const delCategory = async (id) => {
    try {
      await axiosInstance.delete(`/api/category/${id}`);
     getAllCategory();

      
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
      <div className="flex-1">
        <Header />
        <div className="bg-gray-700 shadow-lg rounded-xl px-6 border border-gray-600 w-80 py-12 m-auto mt-10">
          <h2 className="text-xl font-semibold text-gray-100 text-center mb-10">
            Add Category
          </h2>
          <form
            className="grid grid-col-1 grid-row-2 gap-y-2"
            onSubmit={handleSubmit}
          >
            <div className=" ">
              <label
                htmlFor="amount"
                className="text-sm font-semibold text-gray-100 "
              >
                Category Name
              </label>
              <br />
              <input
                type="text"
                onChange={handleData}
                name="name"
                placeholder="Add Category"
                className="w-full pl-3 pr-3 py-2 bg-gray-800 opacity-70 rounded-lg border-gray-700 border focus:border-green-500 focus:ring-2 focus:ring-green-500 transition-all text-white placeholder-gray-400"
              />
            </div>

            <motion.button
              className="col-span-1 mt-5 bg-gradient-to-r from-green-500 to-emerald-600 text-center font-semibold text-white py-2 rounded-2xl shadow-lg cursor-pointer focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-600"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
            >
              Add Category
            </motion.button>
          </form>
        </div>
        <div className="bg-gray-700 shadow-lg rounded-xl px-6 border border-gray-600 w-100 py-12 m-auto mt-10 h-100 overflow-y-auto">
          <h2 className="text-xl font-semibold text-gray-100  mb-10">
            All Category
          </h2>
            {allCategory.data?.map((curr, i) => {
                return (
                  <div className="flex justify-start" key={curr._id}>
               
                  <h2 className="text-xl font-semibold text-gray-100  mb-10">
                  {i+1}
                  </h2>
                  <h2 className="text-md font-semibold text-gray-100  mb-10 mx-10">
                   {curr.name}
                  </h2>
                  <DeleteIcon className="text-red-600 cursor-pointer" onClick={()=>delCategory(curr._id)} />
              
                  </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Category;
