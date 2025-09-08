export interface User {
    id: string;
    full_name: string;
    profile_img: string | null;
    role?: "student" | "teacher" | "admin";
}

export interface Reply {
    id: string;
    content: string;
    created_at: string;
    question: string;
    teacher: User;
    likes?: number;
    liked?: boolean;
}

export interface QnA {
    id: string;
    content: string;
    video: {
        id: string;
        title: string;
    };
    student: User;
    reply?: Reply;
    created_at: string;
    updated_at?: string;
    likes?: number;
    liked?: boolean;
    views?: number;
    is_edited?: boolean;
}

