import api from ".";

export const getTeacherQuestions = async () => {
    try {
        const res = await api.get("/qna/questions/");
        return res.data;
    } catch (error) {
        console.error(error);
        return;
    }
};

export const createReply = async (content: string, question_id: string) => {
    try {
        const res = await api.post("/qna/replies/", {
            content,
            question: question_id,
        });
        return res.data;
    } catch (error) {
        console.error(error);
        return;
    }
};

export const editReply = async (content: string, replyId: string) => {
    try {
        const res = await api.patch(`/qna/replies/${replyId}/`, {
            content,
        });
        return res.data;
    } catch (error) {
        console.error(error);
        return;
    }
};

export const deleteReply = async (id: string) => {
    try {
        await api.delete(`/qna/replies/${id}/`);
    } catch (error) {
        console.error(error);
        return;
    }
};

// __________________________ STUDENT ______________________________

export const createQuestion = async (question: string, videoId: string) => {
    try {
        const res = await api.post("/qna/questions/", {
            content: question,
            video_id: videoId,
        });
        return res.data;
    } catch (error) {
        console.error(error);
        return;
    }
};

export const editQuestion = async (questionId: string, content: string) => {
    try {
        const res = await api.patch(`/qna/questions/${questionId}/`, {
            content,
        });
        return res.data;
    } catch (error) {
        console.error(error);
        return;
    }
};

export const deleteQuestion = async (questionId: string) => {
    try {
        await api.delete(`/qna/questions/${questionId}/`);
    } catch (error) {
        console.error(error);
        return;
    }
};