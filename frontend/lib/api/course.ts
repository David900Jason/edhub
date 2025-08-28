import { AxiosError } from "axios";
import api from ".";

type CreateCourseData = Omit<
    CourseType,
    "id" | "created_at" | "updated_at" | "rating"
>;

export const getCourses = async (): Promise<CourseType[]> => {
    try {
        const res = await api.get("/courses/");
        return res.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getCourse = async (
    courseId: string,
): Promise<CourseType | null> => {
    try {
        const res = await api.get(`/courses/${courseId}`);
        return res.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const createCourse = async (data: CreateCourseData) => {
    try {
        const res = await api.post("/courses/", data);
        return res.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const updateCourse = async (courseId: string, data: CourseType) => {
    try {
        const res = await api.put(`/courses/${courseId}/`, data);
        return res.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const deleteCourse = async (courseId: string) => {
    try {
        const res = await api.delete(`/courses/${courseId}/`);
        return res.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getStudentEnrollments = async () => {
    try {
        const res = await api.get("/enrollments/");
        return res.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getEnrollmentById = async (id: string) => {
    try {
        const res = await api.get(`/enrollments/${id}/`);
        return res.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const enrollCourse = async (courseId: string) => {
    try {
        const res = await api.post(`/courses/${courseId}/enroll/`);
        return res.data.message;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error(error?.response?.data.error);
            return error?.response?.data.error;
        }
        console.error(error);
        return;
    }
};
