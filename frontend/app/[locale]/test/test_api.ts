import api from "@/lib/api";

export const checkStatus = async () => {
    const response = await api.get("/health");
    console.log(response.data.status);
};

export const registerTeacher = async () => {
    try {
        const res = await api.post("/api/auth/register", {
            email: "reda@teacher.com",
            password: "password123",
            display_name: "Reda Elkassas",
            role: "teacher",
        });
        const data = await res.data;
        console.log(data);
    } catch (error: any) {
        console.error(error?.response?.data?.error);
    }
};

export const registerStudent = async () => {
    try {
        const res = await api.post("/api/auth/register", {
            email: "ahmed@gmail.com",
            password: "password123",
            display_name: "Ahmed Wael",
            role: "student",
        });
        const data = await res.data;
        console.log(data);
    } catch (error: any) {
        console.error(error?.response?.data?.error);
    }
};

export const loginUser = async ({
    email,
    password,
}: {
    email: string;
    password: string;
}) => {
    try {
        const res = await api.post("/api/auth/login", {
            email,
            password,
        });
        const data = await res.data;
        if (data) {
            localStorage.setItem("user_token", JSON.stringify(data.token));
            localStorage.setItem("user_data", JSON.stringify(data.user));
        }
    } catch (error: any) {
        console.error(error?.response?.data?.error);
    }
};

export const getAllCourses = async (USER_TOKEN: string) => {
    try {
        const res = await api.get("/api/courses", {
            headers: {
                Authorization: `Bearer ${USER_TOKEN}`,
            },
        });
        const data = res.data;
        console.log(data);
    } catch (error: any) {
        console.error(error?.response?.data?.error);
    }
};

export const createCourse = async (USER_TOKEN: string) => {
    try {
        const res = await api.post(
            "/api/courses",
            {
                title: "Learn Javascript from scratch",
                description: "Description 1",
                short_slug: "course-1",
                price_cents: 35000,
                access_days: 30,
            },
            {
                headers: {
                    Authorization: `Bearer ${USER_TOKEN}`,
                },
            },
        );
        const data = res.data;
        console.log(data);
    } catch (error: any) {
        console.error(error?.response?.data?.error);
    }
};

export const getCourse = async (id: string, USER_TOKEN: string) => {
    try {
        const res = await api.get(`/api/courses/${id}`, {
            headers: {
                Authorization: `Bearer ${USER_TOKEN}`,
            },
        });
        const data = res.data;
        console.log(data);
    } catch (error: any) {
        console.error(error?.response?.data?.error);
    }
};

export const updateCourse = async (id: string, USER_TOKEN: string) => {
    try {
        const res = await api.put(
            `/api/courses/${id}`,
            {
                title: "Course 2",
                description: "Description 2",
                short_slug: "course-2",
                price_cents: 35000,
                access_days: 45,
            },
            {
                headers: {
                    Authorization: `Bearer ${USER_TOKEN}`,
                },
            },
        );
        const data = res.data;
        console.log(data);
    } catch (error: any) {
        console.error(error?.response?.data?.error);
    }
};

export const deleteCourse = async (id: string, USER_TOKEN: string) => {
    try {
        const res = await api.delete(`/api/courses/${id}`, {
            headers: {
                Authorization: `Bearer ${USER_TOKEN}`,
            },
        });
        const data = res.data;
        console.log(data);
    } catch (error: any) {
        console.error(error?.response?.data?.error);
    }
};

export const uploadVideo = async (
    e: React.FormEvent<HTMLFormElement>,
    formState: UploadVideoForm,
    USER_TOKEN: string,
) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    formData.append("title", formState.title);
    formData.append("description", formState.description);
    formData.append("duration", formState.duration);
    formData.append("position_id", formState.position_id);
    formData.append("video_file", formState.video_file!);

    try {
        const res = await fetch(
            "https://api.doroosy.com/api/courses/66/videos",
            {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: `Bearer ${USER_TOKEN}`,
                },
            },
        );
        const data = await res.json();
        console.log(data);
    } catch (error: any) {
        console.log("Error Occured: " + error?.response?.data?.error);
    }
};

export const deleteVideo = async (id: string, USER_TOKEN: string) => {
        try {
            const res = await api.delete(`/api/courses/videos/${id}`, {
                headers: {
                    Authorization: `Bearer ${USER_TOKEN}`,
                },
            });
            const data = res.data;
            console.log(data);
        } catch (error: any) {
            console.error(error?.response?.data?.error);
        }
    }

export const getVideoInCourse = async (courseId: string, videoId: string, USER_TOKEN: string) => {
    try {
        const res = await api.get(`/api/courses/${courseId}/videos/${videoId}`, {
            headers: {
                Authorization: `Bearer ${USER_TOKEN}`,
            },
        });
        const data = res.data;
        console.log(data);
    } catch (error: any) {
        console.error(error?.response?.data?.error);
    }
};

export const getVideosInCourse = async (courseId: string, USER_TOKEN: string) => {
    try {
        const res = await api.get(`/api/courses/${courseId}/videos`, {
            headers: {
                Authorization: `Bearer ${USER_TOKEN}`,
            },
        });
        const data = res.data;
        console.log(data);
    } catch (error: any) {
        console.error(error?.response?.data?.error);
    }
};

export const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, formState: UploadVideoForm, USER_TOKEN: string) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", formState.title);
    formData.append("description", formState.description);
    formData.append("duration", formState.duration);
    formData.append("position_id", formState.position_id);
    formData.append("video_file", formState.video_file || "");

    try {
        const res = await fetch(
            "https://api.doroosy.com/api/courses/67/videos",
            {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: `Bearer ${USER_TOKEN}`,
                },
            },
        );
        const data = await res.json();
        console.log(data);
    } catch (error: any) {
        console.log("Error Occured: " + error?.response?.data?.error);
    }
};

export const createQuiz = async (USER_TOKEN: string) => {
    try {
        const res = await fetch(
            "https://api.doroosy.com/api/courses/67/quizzes",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${USER_TOKEN}`,
                },
                body: JSON.stringify({
                    title: "Quiz 1",
                    description: "Quiz Description 1",
                    passing_score: 70,
                    max_attempts: 3,
                    position_id: 1,
                }),
            },
        );
        const data = await res.json();
        console.log(data);
    } catch (error: any) {
        console.log("Error Occured: " + error?.response?.data?.error);
    }
};

export const getAllQuizzes = async (USER_TOKEN: string) => {
    try {
        const res = await fetch(
            "https://api.doroosy.com/api/courses/67/quizzes",
            {
                headers: {
                    Authorization: `Bearer ${USER_TOKEN}`,
                },
            },
        );
        const data = await res.json();
        console.log(data);
    } catch (error: any) {
        console.log("Error Occured: " + error?.response?.data?.error);
    }
};

export const startQuiz = async (USER_TOKEN: string) => {
    try {
        const res = await fetch(
            "https://api.doroosy.com/api/courses/67/quizzes/24/start",
            {
                headers: {
                    Authorization: `Bearer ${USER_TOKEN}`,
                },
            },
        );
        const data = await res.json();
        console.log(data);
    } catch (error: any) {
        console.log("Error Occured: " + error?.response?.data?.error);
    }
};

export const createBook = async (USER_TOKEN: string) => {
    try {
        const res = await fetch("https://api.doroosy.com/api/videos/34/books", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${USER_TOKEN}`,
            },
            body: JSON.stringify({
                title: "Book 1",
                description: "Book Description 1",
                url: "https://example.com/book.pdf",
                pages: 50,
                position_id: 1,
            }),
        });
        const data = await res.json();
        console.log(data);
    } catch (error: any) {
        console.log("Error Occured: " + error?.response?.data?.error);
    }
};

export const getWallet = async (USER_TOKEN: string) => {
    try {
        const res = await fetch("https://api.doroosy.com/api/wallet", {
            headers: {
                Authorization: `Bearer ${USER_TOKEN}`,
            },
        });
        const data = await res.json();
        console.log(data);
    } catch (error: any) {
        console.log("Error Occured: " + error?.response?.data?.error);
    }
};

export const top_up_wallet = async (USER_TOKEN: string) => {
    try {
        const res = await fetch("https://api.doroosy.com/api/wallet/topup", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${USER_TOKEN}`,
            },
            body: JSON.stringify({
                amount: 10000,
            }),
        });
        const data = await res.json();
        console.log(data);
    } catch (error: any) {
        console.log("Error Occured: " + error?.response?.data?.error);
    }
};

export const purchaseCourse = async (USER_TOKEN: string) => {
    try {
        const res = await fetch("https://api.doroosy.com/api/wallet/purchase", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${USER_TOKEN}`,
            },
            body: JSON.stringify({
                course_id: 67,
            }),
        });
        const data = await res.json();
        console.log(data);
    } catch (error: any) {
        console.log("Error Occured: " + error?.response?.data?.error);
    }
};