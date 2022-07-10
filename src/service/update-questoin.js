import { setAdminMateri } from "../app/fetchApi/connect";
import { getQuestionList } from "../util/session"

export const saveQuestion = async (materiId) => {
    try {
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
        return await setAdminMateri({
            materiId,
            data
        })
    } catch {
        return null;
    }
}