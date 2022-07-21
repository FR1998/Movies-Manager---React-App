import http from "./httpService";
//import apiUrl from "../config.json";

//const apiEndPoint = apiUrl + "/movies";
const apiEndPoint = "http://localhost:3900/api/auth";

export function login(email, password) {
  return http.post(apiEndPoint, {
    email,
    password,
  });
}
