import config from "../../config/index"
import axios from "axios";
import Swal from "sweetalert2";


export const getApi = async (id) => {
    let res = null
    try {
        res = await axios.get(config.api.connect + config.serializeQueryParams({ userId: id ? id : '' })).then(res => res.data.data)
        localStorage.setItem('auth', JSON.stringify(res))
    } catch (e) {
        console.log(e.data.message);
    }
    return res
}

export const updateProfile = async (payload) => {
    if (!navigator.onLine) {
        await offline()
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

export const findSchool = async (school) => {
    if (!navigator.onLine) {
        await offline()
        return
    }
    let res = null
    try {
        res = await axios.get(`${config.api.school}/search` + config.serializeQueryParams(school), { headers: config.getAuthHeader() })
    } catch (e) {
        console.log(e);
    }
    return res.data.data.content
}


export const updateUserSchool = async (id) => {
    if (!navigator.onLine) {
        await offline()
        return
    }
    let res = null
    try {
        res = await axios.put(`${config.api.user}/${config.getAuthId()}/update-school/${id}`, {}, { headers: config.getAuthHeader() })
    } catch (e) {
        console.log(e);
    }
    return res
}

const offline = async () => {
    await Swal.fire(
        'Offline',
        'Sepertinya kamu sedang offline',
        'question'
    )
}
