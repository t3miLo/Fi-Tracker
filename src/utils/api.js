import axios from 'axios';
import {getJwt} from '../helpers/jwt'

const serverUrl = 'http://0.0.0.0:5000';
const http = axios.create({
  baseURL: serverUrl
})

const jwt = getJwt()

export const fetchAllDebts = function (debts) {
    return http.get('/allDebts')
      .then(function (response) {
        return response.data;
      })
      .catch((err) => console.log(err));
    }

 export const getUser = function(user) {
      return http.get('/getUser', {
        headers: {
          Authorization : 'Bearer $'+{jwt}}
        }).then(res => res.setState({
          user: res.data
        })).catch(err => {console.log(err)});
      }