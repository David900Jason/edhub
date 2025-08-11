import axios from "axios";

export const getTeacherById = async (
    id: string | number | "",
): Promise<UserType | undefined> => {
    try {
        if (id === "") {
            return;
        }
        const res = await axios.get(
            `http://localhost:8000/users?id=${id}&role=teacher`,
        );
        return res.data[0];
    } catch (error: unknown) {
        console.error(error);
        return;
    }
};
