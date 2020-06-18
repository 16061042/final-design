import Request from '../pocky-request/index'
import axios from "axios"
// const api = "http://192.168.0.105:8090/final"
let toolkit = {
    post(url, par) {
        return Request().post(url, {
            data: par
        })
    },
    getToken() {
        return axios.post("https://openapi.baidu.com/oauth/2.0/token", {
            grant_type: 'client_credentials',
            client_id: 'H96RMpWN93ay2mYvOGMI46TF',
            client_secret: 'AlcL0GQKFgfi1X49jZ1sMWWwr0UhgBTs'
        })
    }
}
export default toolkit;
