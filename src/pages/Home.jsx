import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import { motion } from "framer-motion";
import Cards from "../Components/Cards";
import LineChartComponent from "../Components/LineChartComponent";
import PieChartComponent from "../Components/PieChartComponent";
import BarChartComponent from "../Components/BarChartComponent";
import { axiosInstance } from "../lib/axiosInstance";
import { useContext } from "react";
import { UserContext } from "../store/LoginContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [totalData, setTotalData] = useState({
    isLoading: false,
    data: null,
    value: 0,
  });

  const [totalAmount, setTotalAmount] = useState({
    isLoading: false,
    data: null,
  });
  const getData = async () => {
    setTotalData((curr) => {
      return { ...curr, isLoading: true };
    });

    try {
      const { data } = await axiosInstance.get("/api/transition/total");
      setTotalData((curr) => {
        return { ...curr, data: data.data[0] };
      });
    } catch (error) {
      console.log(error);
    } finally {
      setTotalData((curr) => {
        return { ...curr, isLoading: false };
      });
    }
  };

  const getAmount = async () => {
    setTotalAmount((curr) => {
      return { ...curr, isLoading: true };
    });

    try {
      const { data } = await axiosInstance.get(
        "/api/transition/total?id=paymentType"
      );
      setTotalAmount((curr) => {
        return {
          ...curr,
          data: data.data,
        };
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setTotalAmount((curr) => {
        return { ...curr, isLoading: false };
      });
    }
  };

  useEffect(() => {
    if (!user.data) {
      navigate("/login");
    }
    getData();
    getAmount();
  }, []);

  return (
    <>
      <Sidebar />
      <div className="flex-1">
        <Header />
    {console.log(totalAmount)}

        <main className="py-6 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid xl:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-5 mt-5"
          >
            <Cards data={totalData.data?.sum} head={"Total"} isMoney={true} />
            <Cards data={totalData.data?.count} head={"Total Transition"} />
            <Cards
              data={totalData.data?.avergeAmount}
              head={"Average Amount"}
              isMoney={true}
            />
            <Cards data={totalAmount.data?.[0].sum} head={totalAmount.data?.[0]._id} isMoney={true} />
            <Cards data={totalAmount.data?.[1].sum} head={totalAmount.data?.[1]._id} isMoney={true} />
            <Cards data={(totalAmount.data?.[1].sum*1)-(totalAmount.data?.[0].sum*1)} head={"Balanced"} isMoney={true} />

          </motion.div>

          <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-5 mt-10">
            <LineChartComponent />
            <PieChartComponent />
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
