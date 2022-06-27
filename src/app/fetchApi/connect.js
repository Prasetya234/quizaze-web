import config from "../../config/index"
import axios from "axios";


export const getApi = async (id) => {
    let res = null
    try {
        res = await axios.get(config.api.connect + config.serializeQueryParams({ userId: id ? id : '' })).then(res => res.data.data)
        localStorage.setItem('auth', JSON.stringify(res))
    } catch (e) {
        console.log(e);
    }
    return res
}

export const updateProfile = async (payload) => {
    if (!navigator.onLine) {
        alert("kamu sedang offline")
        return
    }
    let res = null
    try {
        res = await axios.put(`${config.api.user}/${config.getAuthId()}`, payload, { headers: config.getAuthHeader() })
    } catch (e) {
        console.log(e);
    }
    return res
}

