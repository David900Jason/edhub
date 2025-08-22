import api from "@/lib/api";

export const loginUser = async ({
    email,
    password,
}: {
    email: string;
    password: string;
}) => {
    try {
        const res = await api.post("/auth/login", {
            email,
            password,
        });
        const data = await res.data;
        console.log(data.message);

        if (data) {
            localStorage.setItem("access_token", JSON.stringify(data.access));
            localStorage.setItem("refresh_token", JSON.stringify(data.refresh));
        }
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const getUserProfile = async () => {
    const token = JSON.parse(localStorage.getItem("access_token") || "");
    if (!token) return;

    try {
        const res = await api.get("/user/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await res.data;
        console.log(data);

        if (data) {
            localStorage.setItem("user_profile", JSON.stringify(data));
        }

        return data;
    } catch (error) {
        console.log(error);
    }
};

export const refreshUser = async () => {
    const token = JSON.parse(localStorage.getItem("refresh_token") || "");
    if (!token) return;

    try {
        const res = await api.post("/auth/refresh", {
            refresh: token,
        });
        const data = await res.data;
        console.log(data);

        if (data) {
            localStorage.setItem("access_token", JSON.stringify(data.access));
        }

        return data;
    } catch (error) {
        console.log(error);
    }
};

export const logoutUser = async () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_profile");
};

// export const activateUser = async () => {
//     const user = JSON.parse(localStorage.getItem("user_profile") || "");
//     const token = JSON.parse(localStorage.getItem("access_token") || "");
//     if (!user) return;

//     try {
//         const res = await api.put(`/auth/activate/${user.id}`, {
//             email: user.email,
//         }, {
//             headers: {
//                 Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU1ODc1ODYyLCJpYXQiOjE3NTU4NzU1NjIsImp0aSI6IjJlNTg4ZTFiYzdkZjQyNTNiYzE5ZThjMzcxMzczMTk2IiwidXNlcl9pZCI6IjJkZmU2Y2JiLThkNTAtNDFiMi1hZTkwLWE3MmMwZGFhZmVhNyJ9.WzHfjryjILxjatnF3DoU3tzo8R8d-ETtQQxovlIbD8A`,
//             },
//         });
//         const data = await res.data;
//         console.log(data);

//         return data;
//     } catch (error) {
//         console.log(error);
//     }
// }
