import { createAdminMateri, setAdminMateri } from "../app/fetchApi/connect";
import { getQuestionList } from "../util/session"

export const saveQuestion = async (props, type) => {
    const arr = [];
    const session = getQuestionList();
    session.question.forEach(e => {
        arr.push({
            answerList: e.listAnswer,
            answerTrue: e.answerTrue,
            id: e.id,
            image: e.image,
            question: e.question
        })
    });
    const data = {
        description: session.description,
        materi: session.materi,
        question: arr,
        teacher: session.teacher
    }
    return type === 'EDIT' ? await setAdminMateri({
        materiId: props,
        data
    }) : await createAdminMateri({
        schoolId: props,
        data
    })
}