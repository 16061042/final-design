import axios from "axios"
const api = "http://192.168.43.184:8090/final"
let toolkit = {
    post(url, par) {
        return axios.post(api + url, par)
    }
}
export default toolkit;
