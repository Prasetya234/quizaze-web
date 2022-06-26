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

