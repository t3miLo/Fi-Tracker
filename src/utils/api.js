import axios from "axios";

const serverUrl = "http://0.0.0.0:5000";
const http = axios.create({
  baseURL: serverUrl
});

export const fetchAllDebts = function(debts) {
  return http
    .get("/allDebts")
    .then(function(response) {
      return response.data;
    })
    .catch(err => console.log(err));
};

//  export const getUser = function(user) {
//       return http.get('/getUser', {
//         headers: {
//           Authorization : 'token '+{jwt}}
//         }).then(res => this.setState({
//           user: res.data
//         })).catch(err => {console.log(err)});
//       }
