import api from "@/lib/api";
import { cookies } from "next/headers";

// export const logoutUser = async () => {
//     localStorage.removeItem("access_token");
//     localStorage.removeItem("refresh_token");
//     localStorage.removeItem("user_profile");
// };

// export const editUserProfile = async (data: {
//     full_name?: string;
//     email: string;
//     birth_date?: string;
//     city?: string;
//     parent_number?: string;
//     phone_number?: string;
// }) => {
//     const token = localStorage.getItem("access") || "";
//     if (!token) return;

//     try {
//         const res = await api.put("/users/me", data, {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });
//         const resData = await res.data;

//         if (resData) {
//             localStorage.setItem("user_profile", JSON.stringify(resData));
//         }

//         return resData;
//     } catch (error: any) {
//         if (error.response.status === 401 || !token) {
//             refreshUser();
//             editUserProfile(data);
//             return;
//         }
//         console.error(error);
//     }
// };

// export const refreshUser = async () => {
//     const cookieStore = await cookies();
//     const refresh = cookieStore.get("refresh")?.value;

//     // request an access token
//     try {
//         const res = await api.post("/auth/refresh", {
//             refresh
//         });
//         const data = await res.data;
//         console.log(data.access);
//     } catch (error) {
//         console.log(error);
//     }
// };

// export const activateUser = async (adminToken: string) => {
//     const user = JSON.parse(localStorage.getItem("user_profile") || "");
//     const token = JSON.parse(localStorage.getItem("access_token") || "");
//     if (!user) return;

//     try {
//         const res = await api.put(`/auth/activate/${user.id}`, {
//             email: user.email,
//         }, {
//             headers: {
//                 Authorization: `Bearer ${adminToken}`,
//             },
//         });
//         const data = await res.data;
//         console.log(data);

//         return data;
//     } catch (error) {
//         console.log(error);
//     }
// }
