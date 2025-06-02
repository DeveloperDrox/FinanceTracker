import React from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import { useState } from "react";
import { axiosInstance } from "../lib/axiosInstance";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { DeleteIcon, Pencil } from "lucide-react";
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
function TransitionDetail() {
  const [recentTransition, setRecentTransition] = useState({
    isLoading: false,
    data: null,
  });

  const [deleting, setDeleting] = useState(false);

  const handleDelete = async (id) => {
    setDeleting(true);
    try {
      await axiosInstance.delete(`/api/transition/${id}`);
      getRecentTransition();
      getmaxAmountTransition();
      getallTransition();
    } catch (error) {
      console.log(error);
    } finally {
      setDeleting(false);
    }
  };

  const [maxAmountTransition, setMaxAmountTransition] = useState({
    isLoading: false,
    data: null,
  });
  const [allTransition, setAllTransition] = useState({
    isLoading: false,
    data: null,
  });

  const getallTransition = async () => {
    try {
      const { data } = await axiosInstance.get("/api/transition");
      setAllTransition((curr) => {
        return { ...curr, data: data.user };
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getRecentTransition = async () => {
    try {
      const { data } = await axiosInstance.get("/api/transition?limit=5");
      setRecentTransition((curr) => {
        return { ...curr, data: data.user };
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getmaxAmountTransition = async () => {
    try {
      const { data } = await axiosInstance.get(
        "/api/transition?amount=-1&limit=5"
      );
      setMaxAmountTransition((curr) => {
        return { ...curr, data: data.user };
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRecentTransition();
    getmaxAmountTransition();
    getallTransition();
  }, []);
  return (
    <>
      <Sidebar />
      <div className="flex-1">
        <Header />

        <div className="grid  xl:grid-cols-2 grid-rows-1 m-20 gap-10 lg:grid-cols-1 ">
          <div className="bg-gray-700 shadow-lg rounded-xl p-6 border border-gray-600">
            <h1 className="text-xl mb-5 font-semibold text-indigo-500 ">
              Recent Transition
            </h1>
            <table className="w-full border-spacing-y-2 border-separate">
              <thead>
                <tr className="">
                  <th className="text-start text-slate-900">Category</th>
                  <th className="text-start text-slate-900">Method</th>
                  <th className="text-start text-slate-900"> Type</th>
                  <th className="text-start text-slate-900">Amount</th>
                  <th className="text-start text-slate-900">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentTransition.data?.map((curr) => {
                  const date =
                    new Date(curr.createdAt).getDate() +
                    " " +
                    monthName[new Date(curr.createdAt).getMonth()] +
                    " " +
                    new Date(curr.createdAt).getFullYear();

                  return (
                    <tr key={curr._id}>
                      <td className="capitalize  border-t-1 border-gray-500 pt-2 text-gray-100">
                        {curr.category}
                      </td>
                      <td className="uppercase  border-t-1 border-gray-500 pt-2 text-gray-100">
                        {curr.paymentMethod}
                      </td>
                      <td className="uppercase  border-t-1 border-gray-500 pt-2 text-gray-100">
                        {curr.paymentType}
                      </td>
                      <td className=" border-t-1 border-gray-500 pt-2 text-gray-100">
                        {curr.amount}
                      </td>
                      <td className=" border-t-1 border-gray-500 pt-2 text-gray-100">
                        {date}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="bg-gray-700 shadow-lg rounded-xl p-6 border border-gray-600">
            <h1 className="text-xl mb-5 font-semibold text-indigo-500 ">
              Maximum Transition
            </h1>
            <table className="w-full border-spacing-y-2 border-separate">
              <thead>
                <tr>
                  <th className="text-start text-slate-900">Category</th>
                  <th className="text-start text-slate-900">Method</th>
                  <th className="text-start text-slate-900"> Type</th>
                  <th className="text-start text-slate-900">Amount</th>
                  <th className="text-start text-slate-900">Date</th>
                </tr>
              </thead>
              <tbody>
                {maxAmountTransition.data?.map((curr) => {
                  const date =
                    new Date(curr.createdAt).getDate() +
                    " " +
                    monthName[new Date(curr.createdAt).getMonth()] +
                    " " +
                    new Date(curr.createdAt).getFullYear();

                  return (
                    <tr key={curr._id}>
                      <td className="capitalize  border-t-1 border-gray-500 pt-2 text-gray-100">
                        {curr.category}
                      </td>
                      <td className="uppercase  border-t-1 border-gray-500 pt-2 text-gray-100">
                        {curr.paymentMethod}
                      </td>
                      <td className="uppercase  border-t-1 border-gray-500 pt-2 text-gray-100">
                        {curr.paymentType}
                      </td>
                      <td className=" border-t-1 border-gray-500 pt-2 text-gray-100">
                        {curr.amount}
                      </td>
                      <td className=" border-t-1 border-gray-500 pt-2 text-gray-100">
                        {date}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="grid  grid-rows-1 m-20 gap-10 lg:grid-cols-1  ">
          <div className="bg-gray-700 shadow-lg rounded-xl p-6 border border-gray-600  h-120 overflow-y-scroll ">
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
                {allTransition.data?.map((curr, i) => {
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
      </div>
    </>
  );
}

export default TransitionDetail;
