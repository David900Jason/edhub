import axios from "axios";

export const getCourses = async (): Promise<CourseType[]> => {
    try {
        const res = await axios.get(`http://localhost:8000/courses/`);
        return res.data;
    } catch (error: unknown) {
        console.error(error);
        return [];
    }
};

export const getCourse = async (
    courseId: string,
): Promise<CourseType | null> => {
    try {
        const res = await axios.get(
            `http://localhost:8000/courses/${courseId}`,
        );
        return res.data;
    } catch (error: unknown) {
        console.error(error);
        return null;
    }
};

export const getEnrollmentsByUserId = async (
    userId: string,
): Promise<EnrollmentType[] | null> => {
    try {
        const res = await axios.get(
            `http://localhost:8000/enrollments?user_id=${userId}`,
        );
        return res.data;
    } catch (error: unknown) {
        console.error(error);
        return null;
    }
};

export const getEnrollmentByCourseId = async (
    courseId: string,
): Promise<object | null> => {
    try {
        const res = await axios.get(
            `http://localhost:8000/enrollments?course_id=${courseId}`,
        );
        return res.data;
    } catch (error: unknown) {
        console.error(error);
        return null;
    }
};
