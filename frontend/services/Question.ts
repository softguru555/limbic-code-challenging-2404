import axios from "axios";
import { initiateQuestion, deleteQuestion } from "@/store/actions/questionAction";
import { constants } from "@/app/constants";
import { headers } from "next/dist/client/components/headers";
import { ApiHeader } from "@/app/apiConstants";
import { authHeader } from "@/app/apiConstants";
import { toast } from "react-toastify";


export const addQues = async (dispatch: any, message: any, email: any) => {
  console.log("message", message);
  try {
    const res = ApiHeader.post('/api/question/addQuestion', { question: message, email: email }, authHeader());
    console.log("res", res);
    return toast.success("success")
    // return dispatch(initiateUser(data));
    // return dispatch(deleteUser(id));

  } catch (error) {
    console.log("error in update (service) => ", error.response.data);
    toast.error(error.response.data.message)
  }
};
export const getQues = async (dispatch) => {
  try {
    const res = ApiHeader.get(
      '/api/question/getQuestions', authHeader()
    );
    const data = (await res).data
    return dispatch(initiateQuestion(data));
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};