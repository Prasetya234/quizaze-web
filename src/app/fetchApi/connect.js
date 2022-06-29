import config from "../../config/index"
import axios from "axios";
import Swal from "sweetalert2";


export const getApi = async (id) => {
    let res = null
    if (!navigator.onLine) {
        await offline()
        return
    }
    try {
        res = await axios.get(config.api.connect + config.serializeQueryParams({ userId: id ? id : '' })).then(res => res.data.data)
        localStorage.setItem('auth', JSON.stringify(res))
    } catch (e) {
        console.log(e);
    }
    return res
}

export const updateProfile = async (payload) => {
    let res = null
    if (!navigator.onLine) {
        await offline()
        return
    }
    try {
        res = await axios.put(`${config.api.user}/${config.getAuthId()}`, payload, { headers: config.getAuthHeader() })
    } catch (e) {
        console.log(e);
    }
    return res
}

export const findSchool = async (school) => {
    let res = []
    if (!navigator.onLine) {
        await offline()
        return
    }
    try {
        res = await axios.get(`${config.api.school}/search` + config.serializeQueryParams(school), { headers: config.getAuthHeader() }).then(res => res.data.data.content)
    } catch (e) {
        console.log(e);
    }
    return res
}

export const selectSchoolRandom = async () => {
    let res = null
    if (!navigator.onLine) {
        await offline()
        return
    }
    try {
        res = await axios.get(`${config.api.school}/random`, { headers: config.getAuthHeader() }).then(res => res.data)
    } catch (e) {
        console.log(e);
    }
    return res
}


export const updateUserSchool = async (id) => {
    let res = null
    if (!navigator.onLine) {
        await offline()
        return
    }
    try {
        res = await axios.put(`${config.api.user}/${config.getAuthId()}/update-school/${id}`, {}, { headers: config.getAuthHeader() })
    } catch (e) {
        console.log(e);
    }
    return res
}

export const postAdminLogin = async (payload) => {
    let res = null
    if (!navigator.onLine) {
        await offline()
        return
    }
    try {
        res = await axios.post(`${config.api.login}`, payload).then(res => res.data.data)
    } catch { }
    return res
}

export const searchMateriUser = async (pyload) => {
    let res = []
    if (!navigator.onLine) {
        await offline()
        return
    }
    try {
        res = await axios.get(`${config.api.question}/materi` + config.serializeQueryParams(pyload), { headers: config.getAuthHeader() }).then(res => res.data.data.content)
    } catch (e) {
        console.log(e);
    }
    return res
}

export const questionMateriUser = async (materiId) => {
    let res = null
    if (!navigator.onLine) {
        await offline()
        return
    }
    try {
        res = await axios.get(`${config.api.question}/${materiId}/user`, { headers: config.getAuthHeader() })
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
