import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock } from "lucide-react";
import Input from "../Components/Input";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../store/LoginContext";
import { useEffect } from "react";

const Signup = () => {
  const { signUp, user } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user.data) {
      navigate("/");
    }
  }, []);
  const [signUpData, setSignUpData] = useState({
    isLoading: false,
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSignUpData((curr) => {
      return { ...curr, isLoading: true };
    });
    try {
      const res = await signUp(signUpData);
      if (res.data.success) {
        navigate("/verify");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSignUpData((curr) => {
        return { ...curr, isLoading: false };
      });
    }
  };

  const handleInput = (e) => {
    setSignUpData((curr) => {
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
      className="max-w-md w-full bg-gray-800 backdrop-opacity-50 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden self-center m-auto"
    >
      <div className="p-8">
        <h1 className="bg-gradient-to-r from-green-400 to-emerald-800 text-transparent bg-clip-text text-3xl font-bold text-center mb-8 ">
          Create Account
        </h1>

        <form onSubmit={handleSubmit}>
          <Input
            icon={User}
            placeholder="Enter your name"
            type="text"
            name="name"
            onChange={handleInput}
            value={signUpData.name}
            required
            minLength={3}
          />
          <Input
            icon={Lock}
            placeholder="Enter your password"
            type="password"
            name="password"
            onChange={handleInput}
            required
            minLength={6}

            value={signUpData.password}
          />
          <Input
            icon={Mail}
            placeholder="Enter your email"
            type="email"
            name="email"
            onChange={handleInput}
            required
            value={signUpData.email}
          />
          <motion.button
            className="w-full mt-5 bg-gradient-to-r from-green-500 to-emerald-600 text-center font-semibold text-white py-2 rounded-2xl shadow-lg cursor-pointer focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-600"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
          >
            SignUp
          </motion.button>
        </form>
      </div>
      <div className="bg-gray-900  px-8 w-full py-4">
        <p className="text-sm text-white">
          Already have an Account?{" "}
          <Link to="/login" className="text-green-500 hover:underline">
            LogIn
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Signup;
