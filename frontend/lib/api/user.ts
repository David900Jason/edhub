import api from ".";
import { StudentData } from "@/app/[locale]/dashboard/teacher/students/page";

export const getUserProfile = async () => {
    try {
        const res = await api.get("/users/me/");
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateUser = async (
    data: UpdateUserData,
): Promise<UserType | undefined> => {
    try {
        const res = await api.put("/users/me/", data);
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
        const res = await api.get("/users?role=student/");
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

// _____________________________________ Admin _____________________________________________

export const getAdminStudents = async () => {
    try {
        const res = await api.get("/admin-dashboard/students/");
        return res.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getAdminTeachers = async () => {
    try {
        const res = await api.get("/admin-dashboard/teachers/");
        return res.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getUserWallets = async () => {
    try {
        const res = await api.get("/admin-dashboard/students/wallets/");
        return res.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getPaymentRecords = async () => {
    try {
        const res = await api.get("/admin-dashboard/payments/");
        return res.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const createPaymentRecord = async (data: {
    code: string;
    amount: number;
    wallet: string;
}) => {
    try {
        const res = await api.post("/admin-dashboard/payments/create/", data);
        return res.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const updateUserWallet = async (id: string, balance: number) => {
    try {
        const res = await api.put(`/admin-dashboard/students/wallets/${id}/`, {
            balance,
        });
        return res.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const toggleActiveAdminUser = async (id: string) => {
    try {
        const res = await api.put(`/admin-dashboard/users/${id}/activate/`);
        return res.data;
    } catch (error) {
        console.error(error);
        return;
    }
};

export const toggleVerifiedAdminUser = async (id: string) => {
    try {
        const res = await api.put(`/admin-dashboard/users/${id}/verify/`);
        return res.data;
    } catch (error) {
        console.error(error);
        return;
    }
};
