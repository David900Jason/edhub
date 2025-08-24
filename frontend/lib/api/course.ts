import axios from "axios";
import api from ".";
import { getTeacherById } from "./user";
import { refreshUser } from "./auth";

export const getCourses = async (): Promise<CourseType[]> => {
    const access = localStorage.getItem("access");
    if (!access) return [];

    try {
        const res = await api.get("/courses/", {
            headers: {
                Authorization: `Bearer ${access}`,
            },
        });
        return res.data;
    } catch (error: any) {
        if (error.status === 401) {
            refreshUser();
            getCourses();
        }
        console.error(error);
        return [];
    }
};

export const getCourse = async (
    courseId: string,
): Promise<CourseType | null> => {
    const access = localStorage.getItem("access");
    if (!access) return null;

    try {
        const res = await api.get(`/courses/${courseId}`, {
            headers: {
                Authorization: `Bearer ${access}`,
            },
        });
        return res.data;
    } catch (error: any) {
        if (error.status === 401) {
            refreshUser();
            getCourse(courseId);
        }
        console.error(error);
        return null;
    }
};

export const getEnrollmentsByUserId = async (
    userId: string,
): Promise<EnrollmentType[] | null> => {
    try {
        const res = await axios.get(
            `http://localhost:8001/enrollments?user_id=${userId}&status=active`,
        );
        return res.data;
    } catch (error: unknown) {
        console.error(error);
        return null;
    }
};

export const getEnrollmentByCourseId = async (
    courseId: string,
    userId: string,
): Promise<EnrollmentType[]> => {
    try {
        const res = await axios.get(
            `http://localhost:8001/enrollments?course_id=${courseId}&user_id=${userId}`,
        );
        return res.data;
    } catch (error: unknown) {
        console.error("Error fetching enrollment by course ID:", error);
        return [];
    }
};

export const getUserWallet = async () => {
    const access = localStorage.getItem("access");
    if (!access) return;

    try {
        const res = await api.get("/payments/wallet/me/", {
            headers: {
                Authorization: `Bearer ${access}`,
            },
        });
        return res.data;
    } catch (error: any) {
        if (error.status === 401) {
            refreshUser();
            getUserWallet();
        }
        console.error(error);
        return;
    }
};

export const updateWallet = async (code: string) => {
    const access = localStorage.getItem("access");
    if (!access) return;

    try {
        const res = await api.post("/payments/wallet/me/topup/", {
            code: code,
        }, {
            headers: {
                Authorization: `Bearer ${access}`,
            },
        });
        return res.data;
    } catch (error: any) {
        if (error.status === 401) {
            refreshUser();
            updateWallet(code);
        }
        console.error(error);
        return;
    }
};

export const getUserTransactions = async (): Promise<InvoiceType[]> => {
    const access = localStorage.getItem("access");
    if (!access) return [];

    try {
        const res = await api.get("/payments/wallet/me/payments/", {
            headers: {
                Authorization: `Bearer ${access}`,
            },
        });
        return res.data;
    } catch (error: any) {
        if (error.status === 401) {
            refreshUser();
            getUserTransactions();
        }
        console.error(error);
        return [];
    }
};

export const checkEnrollment = async (
    userId: string,
    courseId: string,
): Promise<boolean> => {
    try {
        const res = await axios.get(
            `http://localhost:8001/enrollments?course_id=${courseId}&user_id=${userId}&status=active`,
        );
        return res.data.length > 0;
    } catch (error: unknown) {
        console.error("Error fetching enrollment by course ID:", error);
        return false;
    }
};

export const getAllTeachersCourses = async (
    teacherId: string | number,
): Promise<CourseType[]> => {
    try {
        const res = await axios.get(
            `http://localhost:8001/courses?teacher_id=${teacherId}`,
        );
        return res.data;
    } catch (error: unknown) {
        console.error(error);
        return [];
    }
};

export const deleteCourse = async (courseId: string): Promise<boolean> => {
    try {
        await axios.delete(`http://localhost:8001/courses/${courseId}`);
        return true;
    } catch (error: unknown) {
        console.error("Error deleting course:", error);
        return false;
    }
};

export const updateCourse = async (
    courseId: string,
    courseData: Partial<CourseType>,
): Promise<boolean> => {
    try {
        await axios.put(
            `http://localhost:8001/courses/${courseId}`,
            courseData,
        );
        return true;
    } catch (error: unknown) {
        console.error("Error updating course:", error);
        return false;
    }
};

export type Student = {
    id: string;
    full_name: string;
    phone_number: string;
    parent_number: string;
    email: string;
    paid_amount: number;
    review: string | null;
    average_score: number;
    progress: number;
    courses_count: number;
    joined_at: string;
};

export const getTeacherStudents = async (
    teacherId: string | number,
): Promise<Student[]> => {
    try {
        // Get all courses for the teacher
        const courses = await getAllTeachersCourses(teacherId);
        if (!courses || courses.length === 0) {
            return [];
        }

        // Get enrollments for each course
        const enrollmentsPromises = courses.map((course) =>
            axios
                .get(`http://localhost:8001/courses/${course.id}/enrollments`)
                .then((res) => res.data)
                .catch((error) => {
                    console.error(
                        `Error fetching enrollments for course ${course.id}:`,
                        error,
                    );
                    return [];
                }),
        );

        const enrollmentsResults = await Promise.all(enrollmentsPromises);

        // Flatten and process enrollments
        const studentsData: Student[] = [];

        for (let i = 0; i < enrollmentsResults.length; i++) {
            const courseEnrollments = enrollmentsResults[i];
            if (!courseEnrollments || !Array.isArray(courseEnrollments))
                continue;

            const course = courses[i];
            if (!course) continue;

            for (const enrollment of courseEnrollments) {
                if (!enrollment?.user_id) continue;

                try {
                    const studentRes = await axios.get(
                        `http://localhost:8001/users/${enrollment.user_id}`,
                    );
                    console.log("Student API response:", studentRes.data);

                    const student = studentRes.data;
                    if (!student) continue;

                    const paidAmount = Number(enrollment.payment_amount) || 0;
                    const review = enrollment.review || null;
                    const averageScore = Number(enrollment.average_score) || 0;
                    const progress = Number(enrollment.progress) || 0;
                    const joinedAt =
                        enrollment.enrolled_at ||
                        enrollment.created_at ||
                        new Date().toISOString();

                    const existingStudent = studentsData.find(
                        (s) => s.id === student.id,
                    );

                    if (existingStudent) {
                        existingStudent.courses_count += 1;
                        existingStudent.paid_amount += paidAmount;
                        const enrolledAt = new Date(joinedAt);
                        if (new Date(existingStudent.joined_at) > enrolledAt) {
                            existingStudent.joined_at =
                                enrolledAt.toISOString();
                        }
                    } else {
                        studentsData.push({
                            id: student.id,
                            full_name: student.full_name || "Unknown Student",
                            phone_number: student.phone_number || "N/A",
                            parent_number: student.parent_number || "N/A",
                            paid_amount: paidAmount,
                            review: review,
                            average_score: averageScore,
                            progress: progress,
                            courses_count: 1,
                            joined_at: joinedAt,
                            email: student.email || "No email",
                        });
                    }
                } catch (error) {
                    console.error(
                        `Error processing student ${enrollment.user_id}:`,
                        error,
                    );
                }
            }
        }

        return studentsData;
    } catch (error) {
        console.error("Error fetching teacher students:", error);
        return [];
    }
};

export const createCourse = async (
    courseData: Omit<
        CourseType,
        | "id"
        | "created_at"
        | "updated_at"
        | "rating"
        | "teacher_id"
        | "thumbnail"
        | "discount"
        | "is_published"
        | "is_paid"
        | "currency"
    > & { teacher_id: string | number },
): Promise<CourseType | null> => {
    try {
        const defaultValues = {
            price: 0,
            discount: 0,
            currency: "EGP",
            is_paid: false,
            is_published: false,
            thumbnail: "https://dummyimage.com/600x400",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            rating: 0,
        };

        const response = await axios.post("http://localhost:8001/courses", {
            ...defaultValues,
            ...courseData,
        });

        return response.data;
    } catch (error: unknown) {
        console.error("Error creating course:", error);
        return null;
    }
};
