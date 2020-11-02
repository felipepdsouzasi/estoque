import axios from "axios";

const http  = axios.create({
  baseURL: "http://localhost:56862/api",
  headers: {
    Accept: "application/json",
    "Content-type": "application/json"
  }
});

export default http;