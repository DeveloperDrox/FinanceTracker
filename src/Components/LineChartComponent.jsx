import React from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { motion } from "framer-motion";
import { useState } from "react";
import { axiosInstance } from "../lib/axiosInstance";
import { useEffect } from "react";
const data = [
  {
    name: "Jan",
    value: 100,
  },
  {
    name: "Feb",
    value: 1020,
  },
  {
    name: "Mar",
    value: 1001,
  },
  {
    name: "April",
    value: 5100,
  },
  {
    name: "Ma7",
    value: 1100,
  },
];
function LineChartComponent() {
  const [category, setCategory] = useState({
    isLoading: false,
    data: null,
  });

  const getData = async () => {
    setCategory((curr) => {
      return { ...curr, isLoading: true };
    });

    try {
      const { data } = await axiosInstance.get(
        "/api/transition"
      );
      setCategory((curr) => {
        return { ...curr, data: data.user };
      });
    } catch (error) {
      console.log(error);
    } finally {
      setCategory((curr) => {
        return { ...curr, isLoading: false };
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <motion.div
      className="bg-gray-700 shadow-lg rounded-xl p-6 border border-gray-600 "
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-lg font-semibold text-gray-100">Sales Overview</h2>

      <div className="h-80">
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <LineChart data={category?.data}>
            <XAxis dataKey={`createdAt`} stroke="#000000" />
            <YAxis stroke="#6366F1" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(30,30,30,0.4)",
                borderColor: "rgba(30,30,30,0.9)",
              }}
              itemStyle={{
                color: "#ffffff",
              }}
            />
            <Line
              type={"monotone"}
              dataKey={"amount"}
              dot={{ fill: "#6366F1", strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, strokeWidth: 2 }}
            />
           
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

export default LineChartComponent;
