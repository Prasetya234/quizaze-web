export const getQuestionList = () => {
    return JSON.parse(localStorage.getItem('question-modifier'))
}

export const getAuthorize = () => {
    return JSON.parse(localStorage.getItem('auth'))
}

export const setQuestionSession = (data) => {
    localStorage.setItem('question-modifier', JSON.stringify(data))
}

export const createQuestionList = () => {
    return {
        description: "",
        materi: "",
        question: [{
            listAnswer: [],
            answerTrue: "",
            id: "",
            image: "",
            question: "",
            countUsed: 0,
        }],
        teacher: ""
    }
}