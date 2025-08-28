// Navbar Links Types
interface NavbarLinkType {
    title: string;
    href: string;
    icon: React.ElementType;
}

// Stats Types
interface StatsType {
    title: string;
    value: number;
    icon: React.ElementType;
}

// Review Types
interface ReviewType {
    name: string;
    message: string;
    rating: number;
    image: string;
    year: "Grade 10" | "Grade 11" | "Grade 12";
}

// Dashboard Links Types
interface DashboardLinkType {
    title: string;
    href: string;
    icon: React.ElementType;
}

// Profile Button Links Types
interface ProfileButtonLinksType {
    label: string;
    href: string;
    icon: React.ElementType;
}

// Course Types
interface CourseType {
    category?: string;
    created_at: string;
    currency: string;
    description: string;
    discount: number;
    id: string;
    is_paid: boolean;
    is_published: boolean;
    price: number;
    rating: number;
    thumbnail?: string;
    title: string;
    updated_at: string;
    teacher?: {
        id: string;
        full_name: string;
    };
}

// Signup Form Types
interface InputGroupProps {
    label: string;
    name: string;
    type: string;
    placeholder: string;
    required?: boolean;
    value?: string;
    onChange?: (value: string) => void;
}

interface SignupFormType {
    full_name: string;
    email: string;
    password: string;
    confirm_password?: string;
    phone_number: string;
    parent_number: string;
    role: string;
    birth_date: string;
    city: string;
}

interface UpdateUserData {
    full_name?: string;
    email?: string;
    password?: string;
    phone_number?: string;
    parent_number?: string;
    birth_date?: string;
    city?: string;
    // Add other user fields that can be updated
}

// Select Types
interface OptionProps {
    label: string;
    value: string | number;
}

interface SelectElementProps {
    placeholder: string;
    options: OptionProps[];
    label?: string;
    name?: string;
    required?: boolean;
    onChange?: (value: string | number) => void;
    register?: any;
}

// User Type
interface UserType {
    id?: number | string;
    full_name: string;
    email: string;
    password: string;
    role: "student" | "teacher";
    phone_number: string;
    parent_phone: string;
    birth_date: string;
    school_year: "1" | "2" | "3";
    is_active?: boolean;
    is_verified?: boolean;
    created_at?: string;
    updated_at?: string;
    city?: string;
    profile_img?: string;
    gender?: "male" | "female";
}

interface EnrollmentType {
    id: string;
    course: CourseType;
    timestamp: string;
    amount_paid?: string;
    rating?: number;
    videos?: { id: string; title: string; likes: number; views: number }[];
    books?: { id: string; title: string; book_url: string }[];
}

interface InvoiceType {
    id: string;
    payment_id: string;
    amount: string;
    code: string;
    created_at: string;
    is_used: boolean;
}

interface Video {
    id: number | string;
    title: string;
    description: string;
    video_url: string;
    thumbnail_url: string;
    likes: number;
    views: number;
    created_at: string;
    course_id?: string;
    books?: { id: string; title: string; book_url?: string }[];
    course?: { id: string; title: string };
    questions?: QnA[];
    related_videos?: { id: string; title: string }[];
}

interface Book {
    id: number;
    title: string;
    description: string;
    book_url: File | undefined | string;
    thumbnail_url: File | undefined | string;
    course_id?: string;
    course?: CourseType;
    video_id?: string;
    video?: string | { id: string; title: string };
    created_at: string;
    updated_at: string;
}

interface QnA {
    id: string;
    content: string;
    video: { id: string; title: string };
    student: { id: string; full_name: string; profile_img: string };
    reply?: {
        content: string;
        created_at: string;
        id: string;
        question: string;
        teacher: {
            id: string;
            full_name: string;
            profile_img: string;
        };
    };
    created_at: string;
}

interface QuestionBase {
    id: string | number; // Made id required
    type: "multiple_choice" | "essay";
    question_text: string;
    mark: number;
    answers?: {
        answer_text: string;
        is_correct: boolean;
    }[];
    model_answer?: string;
    image_url?: string;
}

interface Exam {
    id: string;
    title: string;
    description?: string;
    duration: number; // in minutes
    questions: QuestionBase[];
    marks: number;
    created_at: string;
    updated_at?: string;
    teacher_id: string;
    course_id: string;
    passing_score?: number;
}

interface Assignment {
    id: string;
    title: string;
    description?: string;
    questions: QuestionBase[];
    marks: number;
    created_at: string;
    updated_at: string;
    teacher_id: string;
    course_id: string;
}

interface Quiz {
    id: string;
    title: string;
    description?: string;
    questions: QuestionBase[];
    marks: number;
    created_at: string;
    updated_at?: string;
    duration: number;
    teacher_id: string;
    course_id: string;
}

interface QuizSession {
    id: string;
    user_id: string;
    quiz_id: string;
    score: number;
    max_score: number;
    duration: string;
    answers: {
        question_id: number;
        answer_text: string;
    }[];
    created_at: string;
    ended_at: string;
}

declare interface UploadVideoForm {
    title: string;
    description: string;
    duration: string;
    position_id: string;
    video_file: File | null;
}

declare interface UploadBookForm {
    title: string;
    description: string;
    position_id: string;
    pdf_file: File | null;
}

declare interface NotesType {
    id?: string;
    title: string;
    category: string;
    content: string;
    color: string;
    created_at: string;
    updated_at?: string;
}

declare interface Task {
    id: string;
    task: string;
    status: string;
    created_at: string;
}
