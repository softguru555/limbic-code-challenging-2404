import axios from "axios";
import { initiateUser, deleteUser, updateUser } from "@/store/actions/userAction";
import { constants } from "@/app/constants";
import { headers } from "next/dist/client/components/headers";
import { ApiHeader } from "@/app/apiConstants";
import { authHeader } from "@/app/apiConstants";
import { toast } from "react-toastify";
export const getAgent = async (dispatch) => {
  try {
    const res = ApiHeader.get(
      '/api/user/getUsers', authHeader()
    );
    const data = (await res).data;
    return dispatch(initiateUser(data));
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};

export const deleteAgent = async (dispatch: any, id: any) => {
  try {
    const res = ApiHeader.delete(`/api/user/userDelete/${id}`, authHeader());
    toast.success("Success")
    return dispatch(deleteUser(id));

  } catch (error) {
    console.log("error in update (service) => ", error.response.data);
    toast.error(error.response.data.message)
  }
};
export const resetPassword = async (dispatch: any, id: any, password: any) => {
  try {
    const user = ApiHeader.post(`/api/auth/change-password`, { id: id, password: password }, authHeader());
    toast.success("Sucess")
    return dispatch(updateUser((await user).data));

  } catch (error) {
    console.log("error in update (service) => ", error.response.data);
    toast.error(error.response.data.message)
  }
};