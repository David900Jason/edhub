import api from ".";
import { AxiosProgressEvent } from "axios";

export const getVideo = async (videoId: string): Promise<Video | null> => {
    try {
        const res = await api.get(`/courses/videos/${videoId}`);
        return res.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getVideos = async (): Promise<Video[] | null> => {
    try {
        const res = await api.get("/courses/videos/");
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

type MergeMeta = {
    title: string;
    description: string;
    course_id: string;
    thumbnail_url?: File | null;
};

/**
 * Upload a single chunk
 */
export const uploadVideoChunk = async (
    uploadId: string,
    chunkIndex: number,
    chunk: Blob,
    onUploadProgress?: (e: AxiosProgressEvent) => void,
) => {
    const form = new FormData();
    form.append("upload_id", uploadId);
    form.append("chunk_index", chunkIndex.toString());
    form.append("file", chunk); // ✅ backend expects "file"

    const res = await api.post("/courses/videos/upload-chunk/", form, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress,
    });

    return res.data;
};

/**
 * Merge uploaded chunks and create Video record
 */
export const mergeVideoChunks = async (
    uploadId: string,
    totalChunks: number,
    meta: MergeMeta,
) => {
    const form = new FormData();
    form.append("upload_id", uploadId);
    form.append("total_chunks", totalChunks.toString());
    form.append("title", meta.title);
    form.append("description", meta.description);
    form.append("course_id", meta.course_id);
    if (meta.thumbnail_url) form.append("thumbnail_url", meta.thumbnail_url);

    const res = await api.post("/courses/videos/merge-chunks/", form, {
        headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data;
};

/**
 * High-level upload helper: slices file, uploads chunks, then merges them.
 */
export const uploadVideo = async (
    file: File,
    meta: MergeMeta,
    onProgress: (percent: number) => void,
) => {
    const chunkSize = 5 * 1024 * 1024; // 5MB
    const totalChunks = Math.ceil(file.size / chunkSize);
    const uploadId = `${Date.now()}-${file.name.split(".")[0]}`;

    // Upload chunks
    for (let i = 0; i < totalChunks; i++) {
        const start = i * chunkSize;
        const end = Math.min(start + chunkSize, file.size);
        const chunk = file.slice(start, end);

        await uploadVideoChunk(uploadId, i, chunk, (progressEvent) => {
            if (progressEvent.total) {
                const percent = Math.round(
                    ((i + progressEvent.loaded / progressEvent.total) /
                        totalChunks) *
                        100,
                );
                onProgress(percent);
            }
        });
    }

    // Merge chunks
    return await mergeVideoChunks(uploadId, totalChunks, meta);
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
