import axios from "axios";
import { initiateQuestion, deleteQuestion } from "@/store/actions/questionAction";
import { initiateAnswer, deleteAnswer } from "@/store/actions/answerAction";
import { constants } from "@/app/constants";
import { headers } from "next/dist/client/components/headers";
import { ApiHeader } from "@/app/apiConstants";
import { authHeader } from "@/app/apiConstants";
import { toast } from "react-toastify";


export const addQues = async (dispatch: any, message: any, email: any) => {
  try {
    const res = ApiHeader.post('/api/question/addQuestion', { question: message, email: email }, authHeader());
    return toast.success("success")
    // return dispatch(initiateUser(data));
    // return dispatch(deleteUser(id));

  } catch (error) {
    console.log("error in update (service) => ", error.response.data);
    toast.error(error.response.data.message)
  }
};

export const getQues = async (dispatch: any) => {
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

export const delQues = async (dispatch: any, id: any) => {
  try {
    console.log("id", id)
    const res = ApiHeader.delete(
      `/api/question/delQuestion/${id}`, authHeader()
    );
    const data = (await res).data
    if (data) toast.success("Success")
    return dispatch(deleteQuestion(data.id));
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};

export const getAnswers = async (dispatch: any, id: any) => {
  try {
    const res = ApiHeader.post(
      '/api/question/getAnswers', { id: id }, authHeader()
    );
    const data = (await res).data
    return dispatch(initiateQuestion(data));
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};

export const createAnswer = async (dispatch: any, content: any, email: any, id: any) => {
  try {
    const res = await ApiHeader.post(
      '/api/question/addAnswers', { answer: content, email: email, id: id }, authHeader()
    );
    const data = (await res).data
    return dispatch(initiateQuestion(data));
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};

export const editQues = async (dispatch: any, content: any, id: any) => {
  try {
    const res = await ApiHeader.post(
      '/api/question/editQuestion', { question: content, id: id }, authHeader()
    );
    const data = (await res).data
    return dispatch(initiateQuestion(data));
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};

export const delAsw = async (dispatch: any, id: any) => {
  try {
    const res = ApiHeader.post(
      "/api/question/delAnswer", { id: id }, authHeader()
    );
    const data = (await res).data
    toast.success("Success")
    return dispatch(initiateQuestion(data));
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};
export const editAsw = async (dispatch: any, content: any, id: any) => {
  try {
    const res = await ApiHeader.post(
      '/api/question/editAnswer', { answer: content, id: id }, authHeader()
    );
    const data = (await res).data
    toast.success("Success")
    return dispatch(initiateQuestion(data));
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};