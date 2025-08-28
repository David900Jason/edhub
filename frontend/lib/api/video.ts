import { toast } from "sonner";
import api from ".";
import { AxiosError } from "axios";

export const getVideo = async (videoId: string): Promise<Video | null> => {
    try {
        const res = await api.get(`/courses/videos/${videoId}`);
        return res.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getTeacherVideos = async (): Promise<Video[] | null> => {
    try {
        const res = await api.get("/courses/videos/");
        return res.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getTeacherVideo = async (
    videoId: string,
): Promise<Video | null> => {
    try {
        const res = await api.get(`/courses/videos/${videoId}/`);
        return res.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const likeVideo = async (videoId: string) => {
    try {
        const res = await api.post(`/courses/videos/like/${videoId}/`);
        return res.data;
    } catch (error) {
        console.error(error);
        return;
    }
};

export const uploadVideo = async <T>(data: T) => {
    try {
        const res = await api.post("/courses/videos/upload/", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return res.data;
    } catch (error) {
        if (error instanceof AxiosError && error.response?.data) {
            const data = error.response.data;
            Object.values(data).forEach((messages: unknown) => {
                if (Array.isArray(messages)) {
                    messages.forEach((msg: string) => {
                        if (msg.includes("This field may not be null.")) {
                            toast.error(
                                "You can't leave empty values in field.",
                            );
                            return;
                        }
                        if (
                            msg.includes(
                                "The submitted data was not a file. Check the encoding type on the form.",
                            )
                        ) {
                            toast.error(
                                "Error occured while trying to upload files",
                            );
                            return;
                        }
                        toast.error(msg);
                    });
                } else {
                    toast.error(String(messages));
                }
            });
        }
        return;
    }
};

export const updateVideo = async (videoId: string, data: FormData) => {
    try {
        const res = await api.patch(
            `/courses/videos/${videoId}/replace/`,
            data,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            },
        );
        return res.data;
    } catch (error) {
        console.error(error);
        return;
    }
};

export const deleteVideo = async (videoId: string) => {
    try {
        await api.delete(`/courses/videos/${videoId}/`);
    } catch (error) {
        console.error(error);
        return;
    }
};
