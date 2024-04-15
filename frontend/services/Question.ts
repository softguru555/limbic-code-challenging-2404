import axios from "axios";
import { initiateQuestion, deleteQuestion } from "@/store/actions/questionAction";
import { initiateAnswer, deleteAnswer } from "@/store/actions/answerAction";
import { constants } from "@/app/constants";
import { headers } from "next/dist/client/components/headers";
import { ApiHeader } from "@/app/apiConstants";
import { authHeader } from "@/app/apiConstants";
import { toast } from "react-toastify";


export const addQues = async (message: any, email: any) => {
  try {
    const res = await ApiHeader.post('/api/question/addQuestion', { question: message, email: email }, authHeader());
    toast.success("success")
    console.log("aaa", res)
    return (await res).data;
  } catch (error) {
    console.log("error in update (service) => ", error.response.data);
    toast.error(error.response.data.message)
  }
};

export const getQues = async () => {
  try {
    const res = ApiHeader.get(
      '/api/question/getQuestions', authHeader()
    );
    const data = (await res).data
    return data;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};

export const delQues = async (id: any) => {
  try {
    console.log("id", id)
    const res = await ApiHeader.delete(
      `/api/question/delQuestion/${id}`, authHeader()
    );
    const data = (await res).data
    if (data) toast.success("Success")
    return id;
    // return dispatch(deleteQuestion(data.id));
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

export const createAnswer = async (content: any, email: any, id: any) => {
  try {
    const res = await ApiHeader.post(
      '/api/question/addAnswers', { answer: content, email: email, id: id }, authHeader()
    );
    toast.success("success")
    const data = (await res).data
    return data;
    // return dispatch(initiateQuestion(data));
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};

export const editQues = async (content: any, id: any) => {
  try {
    const res = await ApiHeader.post(
      '/api/question/editQuestion', { question: content, id: id }, authHeader()
    );
    const data = (await res).data
    return data;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};

export const delAsw = async (id: any) => {
  try {
    const res = await ApiHeader.post(
      "/api/question/delAnswer", { id: id }, authHeader()
    );
    const data = (await res).data
    toast.success("Success")
    return data;
    // return dispatch(initiateQuestion(data));
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};
export const editAsw = async (content: any, id: any) => {
  try {
    const res = await ApiHeader.post(
      '/api/question/editAnswer', { answer: content, id: id }, authHeader()
    );
    const data = (await res).data
    toast.success("Success")
    return data;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};