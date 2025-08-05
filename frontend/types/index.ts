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
