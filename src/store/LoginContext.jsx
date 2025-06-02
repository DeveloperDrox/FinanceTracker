import { createContext } from "react";
import { axiosInstance } from "../lib/axiosInstance";
import { useState } from "react";

export const UserContext = createContext();

export const LoginContext = ({ children }) => {
  const [user, setUser] = useState({
    isLoading: false,
    data: null,
  });
  const signUp = async (data) => {
    return await axiosInstance.post("/api/user/signup", data);
  };

  const getProfile = async () => {
    try {
      const { data } = await axiosInstance.get("/api/user");
      // console.log(data)
      setUser((curr) => {
        return { ...curr, data: data.data };
      });
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (data, setData) => {
    setData((curr) => {
      return { ...curr, isLoading: true };
    });

    try {
      return await axiosInstance.post("/api/user/login", data);
    } catch (error) {
      console.log(error);
    } finally {
      setData((curr) => {
        return { ...curr, isLoading: false };
      });
    }
  };

  const verify = async (data, setData) => {
    setData((curr) => {
      return { ...curr, isLoading: true };
    });

    try {
      const res = await axiosInstance.post("/api/user/verify", data);
      return res;
    } catch (error) {
      console.log(error);
    } finally {
      setData((curr) => {
        return { ...curr, isLoading: false };
      });
    }
  };

  return (
    <UserContext.Provider value={{ signUp, getProfile, user, login, verify }}>
      {children}
    </UserContext.Provider>
  );
};
