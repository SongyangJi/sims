import axios from 'axios'

export const postRequest = (url,data) => {
    return axios.post(url,data);
}
