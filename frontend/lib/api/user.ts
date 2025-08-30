import api from ".";
import { StudentData } from "@/app/[locale]/dashboard/teacher/students/page";

export const getUserProfile = async () => {
    try {
        const res = await api.get("/users/me");
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateUser = async (
    data: UpdateUserData,
): Promise<UserType | undefined> => {
    try {
        const res = await api.put("/users/me", data);
        const user_profile = await getUserProfile();
        sessionStorage.setItem("user_profile", JSON.stringify(user_profile));
        return res.data;
    } catch (error) {
        console.error(error);
        return;
    }
};

export const getMyStudents = async (): Promise<StudentData[] | null> => {
    try {
        const res = await api.get("/users?role=student");
        return res.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getDashboardDetails = async () => {
    try {
        const res = await api.get("/users/me/dashboard/");
        return res.data.dashboard_details;
    } catch (error) {
        console.error(error);
        return;
    }
};
