// Navbar Links Types
declare interface NavbarLinkType {
    title: string;
    href: string;
    icon: React.ElementType;
}

// Stats Types
declare interface StatsType {
    title: string;
    value: number;
    icon: React.ElementType;
}

// Review Types
declare interface ReviewType {
    name: string;
    message: string;
    rating: number;
    image: string;
    year: "Grade 10" | "Grade 11" | "Grade 12";
}

// Dashboard Links Types
declare interface DashboardLinkType {
    title: string;
    href: string;
    icon: React.ElementType;
}

// Profile Button Links Types
declare interface ProfileButtonLinksType {
    label: string;
    href: string;
    icon: React.ElementType;
}

// Course Types
declare interface CourseType {
    id?: number;
    title: string;
    image: string;
    schoolYear: string | number;
    subject: string;
    createdAt: string;
    sessions: number;
    price: number;
}

// Signup Form Types
declare interface InputGroupProps {
    label: string;
    name: string;
    type: string;
    placeholder: string;
    required?: boolean;
    value?: string;
    onChange?: (value: string) => void;
}

declare interface SignupFormType {
    full_name: string;
    email: string;
    password: string;
    confirm_password: string;
    phone: string;
    role: string;
    school_year: string;
    parent_phone: string;
    birth_date: string;
    city: string;
}

// Select Types
declare interface optionProps {
    label: string;
    value: string | number;
}

declare interface SelectElementProps {
    placeholder: string;
    options: optionProps[];
    label?: string;
    name?: string;
    required?: boolean;
    onChange?: (value: string | number) => void;
    register?: any;
}

// User Type
declare interface UserType {
    id?: number;
    full_name: string;
    email: string;
    password: string;
    role: "student" | "teacher";
    phone_number: string;
    parent_phone: string;
    birth_date: string;
    school_year: 1 | 2 | 3;
    is_active?: boolean;
    is_verified?: boolean;
    created_at?: string;
    updated_at?: string;
    city?: string;
}
