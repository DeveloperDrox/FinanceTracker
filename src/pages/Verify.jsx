import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import Input from "../Components/Input";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../store/LoginContext";
function Verify() {
  const { verify } = useContext(UserContext);
  const navigate = useNavigate();

  const [code, setCode] = useState({
    isLoading: false,
    code: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await verify(code, setCode);
    if (res.data.success) {
      navigate("/");
    }
  };

  const handleInput = (e) => {
    setCode((curr) => {
      return { ...curr, [e.target.name]: e.target.value };
    });
  };
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 backdrop-opacity-50 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden "
    >
      <div className="p-8">
        <h1 className="bg-gradient-to-r from-green-400 to-emerald-800 text-transparent bg-clip-text text-3xl font-bold text-center mb-8 ">
          Verify
        </h1>

        <form onSubmit={handleSubmit}>
          <Input
            icon={ShieldCheck}
            placeholder="Enter Verification Code"
            type="text"
            name="code"
            onChange={handleInput}
            value={code.code}
            maxLength={6}
          />
          <motion.button
            className="w-full mt-5 bg-gradient-to-r from-green-500 to-emerald-600 text-center font-semibold text-white py-2 rounded-2xl shadow-lg cursor-pointer focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-600"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
          >
            Verify
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}

export default Verify;
