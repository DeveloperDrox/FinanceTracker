import React from "react";
import { motion } from "framer-motion";
import { useContext } from "react";
import { Mail, Lock } from "lucide-react";

import { UserContext } from "../store/LoginContext";
import { useState } from "react";
import Input from "../Components/Input";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
function Login() {
  const { login, user } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user.data) {
      navigate("/");
    }
  }, []);

  const [loginData, setLoginData] = useState({
    isLoading: false,
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(loginData, setLoginData);
    if (res.data.success) {
      navigate("/");
    }
  };

  const handleInput = (e) => {
    setLoginData((curr) => {
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
      className="max-w-md w-full bg-gray-800 backdrop-opacity-50 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden self-center m-auto "
    >
      <div className="p-8">
        <h1 className="bg-gradient-to-r from-green-400 to-emerald-800 text-transparent bg-clip-text text-3xl font-bold text-center mb-8 ">
          Login
        </h1>

        <form onSubmit={handleSubmit}>
          <Input
            icon={Mail}
            placeholder="Enter your email"
            type="email"
            name="email"
            onChange={handleInput}
            required
            value={loginData.email}
          />
          <Input
            icon={Lock}
            placeholder="Enter your Password"
            type="password"
            name="password"
            onChange={handleInput}
            value={loginData.password}
            required
          />
          <motion.button
            className="w-full mt-5 bg-gradient-to-r from-green-500 to-emerald-600 text-center font-semibold text-white py-2 rounded-2xl shadow-lg cursor-pointer focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-600"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
          >
            Login
          </motion.button>
        </form>
      </div>
      <div className="bg-gray-900  px-8 w-full py-4">
        <p className="text-sm text-white">
          New to this ?{" "}
          <Link to="/signup" className="text-green-500 hover:underline">
            Signup
          </Link>
        </p>
      </div>
    </motion.div>
  );
}

export default Login;
