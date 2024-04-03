import axios from "axios";
import { constants } from "./constants";
export const ApiHeader = axios.create({
 baseURL: constants.BASE_URL,
});
export const authHeader = () => {
    const token = window.sessionStorage.getItem('token');
    return {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
   };