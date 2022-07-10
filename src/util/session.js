export const getQuestionList = () => {
    return JSON.parse(localStorage.getItem('question-edit'))
}

export const getAuthorize = () => {
    return JSON.parse(localStorage.getItem('auth'))
}

export const setQuestionSession = (data) => {
    localStorage.setItem('question-edit', JSON.stringify(data))
}