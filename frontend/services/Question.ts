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
export const delQues = async (dispatch, id) => {
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
export const getAnswers = async (dispatch, id) => {
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
export const createAnswer = async (dispatch, content, email, id) => {
  try {
    // console.log("just wait", email); return;

    const res = await ApiHeader.post(
      '/api/question/addAnswers', { answer: content, email: email, id: id }, authHeader()
    );
    const data = (await res).data
    return dispatch(initiateQuestion(data));
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};

export const delAsw = async (dispatch, id, delanswer) => {
  try {
    const res = ApiHeader.post(
      "/api/question/delAnswer", { questionId: id, answer: delanswer }, authHeader()
    );
    const data = (await res).data
    return dispatch(deleteQuestion(data.id));
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};
