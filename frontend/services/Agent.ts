import axios from "axios";
import { initiateUser, deleteUser, updateUser } from "@/store/actions/userAction";
import { constants } from "@/app/constants";
import { headers } from "next/dist/client/components/headers";
import { ApiHeader } from "@/app/apiConstants";
import { authHeader } from "@/app/apiConstants";
import { toast } from "react-toastify";
import { useContext } from "react";
export const getAgent = async () => {
  try {
    const res = ApiHeader.get(
      '/api/user/getUsers', authHeader()
    );
    const data = await res;
    return data.data;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};

export const deleteAgent = async (id: any) => {
  try {
    const res = await ApiHeader.delete(`/api/user/userDelete/${id}`, authHeader());
    toast.success("Success")
    return id;

  } catch (error) {
    console.log("error in update (service) => ", error.response.data);
    toast.error(error.response.data.message)
  }
};
export const resetPassword = async (id: any, password: any) => {
  try {
    const user = await ApiHeader.post(`/api/auth/change-password`, { id: id, password: password }, authHeader());
    toast.success("Sucess")
    console.log("user", user); return;
    return user;

  } catch (error) {
    console.log("error in update (service) => ", error.response.data);
    toast.error(error.response.data.message)
  }
};