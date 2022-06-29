const BASE_PATH_V1 = process.env.REACT_APP_BASE_URL_V1
// const BASE_PATH_V2 = process.env.APP_BASE_URL_V2

const api = {
    admin: `${BASE_PATH_V1}/api/admin`,
    question: `${BASE_PATH_V1}/api/question`,
    school: `${BASE_PATH_V1}/api/school/registrasion`,
    user: `${BASE_PATH_V1}/api/user`,
    userScore: `${BASE_PATH_V1}/api/user-score`,
    connect: `${BASE_PATH_V1}/api/trafic-global-user/connect`,
    login: `${BASE_PATH_V1}/api/login`
}
const getAuthHeader = () => {
    const local = JSON.parse(localStorage.getItem('auth'))
    return {
        Authorization: 'Bearer ' + local.jwt,
        'Access-Control-Allow-Origin': '*'
    }
}
const getAuthId = () => {
    const local = JSON.parse(localStorage.getItem('auth'))
    return local.user.id
}
const serializeQueryParams = (paramObj) => {
    if (paramObj) {
        return (
            '?' +
            Object.keys(paramObj)
                .map((k) => {
                    if (typeof paramObj[k] === 'object') {
                        return paramObj[k]
                            .map((v) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
                            .join('&')
                    } else {
                        return `${encodeURIComponent(k)}=${encodeURIComponent(
                            paramObj[k]
                        )}`
                    }
                })
                .join('&')
        )
    }
    return ''
}

const request = {
    api,
    getAuthHeader,
    serializeQueryParams,
    getAuthId
}

export default request;