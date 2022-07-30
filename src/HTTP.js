import axios from "axios";
export const HTTP = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
  // withCredentials: true,
  // headers: {
  //   Accept: "application/json",
  //   "Content-Type": "application/json",
  // },
});