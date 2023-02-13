import axios from "axios";

export const configAPI = {
  baseURL: "http://127.0.0.1:8000/",
  subURL: "",
};

export const fetchAPI = (url = "", method = "", data = {}) => {
  return axios({
    url: configAPI.baseURL + url,
    method: method,
    data: data,
  })
    .then((res) => {
      var data = res.data;
      return data;
    })
    .catch((errors) => {
      return errors;
    });
};
