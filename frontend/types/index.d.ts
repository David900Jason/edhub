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
    id: string;
    title: string;
    description: string;
    teacher_id: string;
    price: number;
    school_year: string;
    discount: number;
    currency: string;
    is_paid: boolean;
    is_published: boolean;
    category: string;
    thumbnail: string;
    created_at: string;
    updated_at: string;
    rating?: number;
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
    role: string;
    school_year: string;
    parent_number: string;
    birth_date: string | null;
    city: string;
}

interface UpdateUserData {
    full_name?: string;
    email?: string;
    password?: string;
    phone_number?: string;
    parent_number?: string;
    birth_date?: string;
    school_year?: string;
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
    image?: string;
    gender?: "male" | "female";
}

interface EnrollmentType {
    id: string;
    course_id: string;
    user_id: string;
    review: number;
    teacher_id: string;
    enrolled_at: string;
    created_at: string;
    is_paid: boolean;
    price?: number;
    status?: string;
    payment_id?: string;
}

interface InvoiceType extends EnrollmentType {
    course_name: string;
    teacher_name: string;
}

interface Video {
    id: number | string;
    title: string;
    description: string;
    duration: string;
    url: string;
    thumbnail: string;
    course_id: string | undefined;
    likes: number;
    views: number;
    created_at: string;
}

interface Book {
    id: number;
    title: string;
    src: string;
    course_id: string | undefined;
    video_id: string;
}

interface QnA {
    id: string;
    user_id: string;
    video_id: string;
    question_text: string;
    reply: {
        answer_text: string;
        teacher_id: string;
        created_at: string;
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