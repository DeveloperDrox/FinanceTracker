import React from "react";
import Sidebar from "../Components/Sidebar";
import { motion } from "framer-motion";
import Cards from "../Components/Cards";
import { Link, useParams } from "react-router-dom";
import { axiosInstance } from "../lib/axiosInstance";
import { useEffect } from "react";
import { useState } from "react";
import { DeleteIcon, Pencil } from "lucide-react";
import Header from "../Components/Header";

const monthName = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
function ItemsDetail() {
  const { item, itemName } = useParams();

  const [itemData, setItemData] = useState({
    isLoading: false,

    data: null,
  });

  const [deleting, setDeleting] = useState(false);

  const handleDelete = async (id) => {
    setDeleting(true);
    try {
      await axiosInstance.delete(`/api/transition/${id}`);
      getUserData();
    } catch (error) {
      console.log(error);
    } finally {
      setDeleting(false);
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/api/transition/${item}/${itemName}`
      );
      setItemData((curr) => {
        return { ...curr, data: data.user };
      });

      const sum=data.user.reduce((prev,x)=>{
      return  prev?.amount+x?.amount
      },0)

      console.log(sum)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  });
  return (
    <>
      <Sidebar />
      <main className=" flex-1">
        <Header />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 gap-5 mt-5"
        >
          {/* <Cards /> */}
          {/* <Cards /> */}
        </motion.div>
        <div className="p-5">
          <div className="bg-gray-700 shadow-lg rounded-xl p-6 border border-gray-600  h-120 overflow-y-scroll w-full ">
            <div>
              <h1 className="text-xl mb-5 font-semibold text-indigo-500 ">
                All Transitions
              </h1>
            </div>
            <table className="w-full border-spacing-y-2 border-separate">
              <thead>
                <tr>
                  <th className="text-start text-slate-900">S.No</th>

                  <th className="text-start text-slate-900">Category</th>
                  <th className="text-start text-slate-900">Method</th>
                  <th className="text-start text-slate-900"> Type</th>
                  <th className="text-start text-slate-900">Amount</th>
                  <th className="text-start text-slate-900">Date</th>
                  <th className="text-start text-blue-600 font-semibold">
                    Edit
                  </th>
                  <th className="text-start text-red-500 font-semibold">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {itemData.data?.map((curr, i) => {
                  const date =
                    new Date(curr.createdAt).getDate() +
                    " " +
                    monthName[new Date(curr.createdAt).getMonth()] +
                    " " +
                    new Date(curr.createdAt).getFullYear();

                  return (
                    <tr key={curr._id} className="">
                      <td className="capitalize border-t-1 border-gray-500 pt-2 text-gray-100">
                        {i + 1}
                      </td>

                      <td className="capitalize border-t-1 border-gray-500 pt-2 text-gray-100 font-semibold hover:underline">
                        <Link to={`/transition/category/${curr.category}`}>
                          {curr.category}
                        </Link>
                      </td>
                      <td className="uppercase border-t-1 border-gray-500 pt-2 text-gray-100 font-semibold hover:underline">
                        <Link
                          to={`/transition/paymentMethod/${curr.paymentMethod}`}
                        >
                          {curr.paymentMethod}
                        </Link>
                      </td>
                      <td className="uppercase border-t-1 border-gray-500 pt-2 text-gray-100 font-semibold hover:underline">
                        <Link
                          to={`/transition/paymentType/${curr.paymentType}`}
                        >
                          {curr.paymentType}
                        </Link>
                      </td>
                      <td className=" border-t-1 border-gray-500 pt-2 text-gray-100">
                        {curr.amount}
                      </td>
                      <td className=" border-t-1 border-gray-500 pt-2 text-gray-100">
                        {date}
                      </td>
                      <td className=" border-t-1 border-gray-500 pt-2 text-blue-700 hover:text-blue-600 cursor-pointer">
                        <Link to={`/transition/${curr._id}/edit`}>
                          <Pencil />
                        </Link>
                      </td>
                      <td
                        className=" border-t-1 border-gray-500 pt-2  cursor-pointer text-red-700 hover:text-red-600"
                        onClick={() => handleDelete(curr._id)}
                      >
                        {!deleting ? <DeleteIcon /> : "Deleting"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}

export default ItemsDetail;
