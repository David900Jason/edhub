// This will be displayed in the page title and in search engine results

import { LogIn, UserPlus, BookOpen, Group, User, Video } from "lucide-react";

export const navLinks = [
    {
        title: "Sign In",
        href: "/login",
        icon: LogIn,
    },
    {
        title: "Sign Up",
        href: "/signup",
        icon: UserPlus,
    },
];

export const stats = [
    {
        title: "Teachers",
        value: 20,
        icon: Group,
    },
    {
        title: "Students",
        value: 450,
        icon: User,
    },
    {
        title: "Courses",
        value: 80,
        icon: BookOpen,
    },
    {
        title: "Videos",
        value: 200,
        icon: Video,
    },
];

// Create 6 different reviews
export const reviews: ReviewType[] = [
    {
        name: "John Doe",
        rating: 5,
        message:
            "This course is amazing! I learned so much about web development in such a short time. The instructors are incredibly knowledgeable and supportive.",
        year: "Grade 12",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
        name: "Sarah Johnson",
        rating: 5,
        message:
            "As a Grade 11 student, I was struggling with math until I found these courses. The explanations are clear and the practice problems really help reinforce the concepts.",
        year: "Grade 11",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
        name: "Michael Chen",
        rating: 4,
        message:
            "Great platform for science subjects! The interactive lessons made complex topics much easier to understand. Would love to see more advanced physics content.",
        year: "Grade 12",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
        name: "Emily Rodriguez",
        rating: 5,
        message:
            "The best online learning experience I've had. The literature courses are engaging and the teachers are passionate about the subjects they teach. Highly recommend!",
        year: "Grade 10",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
        name: "David Kim",
        rating: 5,
        message:
            "As someone who was falling behind in chemistry, these courses were a game-changer. The step-by-step explanations and practice problems helped me improve my grades significantly.",
        year: "Grade 11",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
        name: "Aisha Mohammed",
        rating: 5,
        message:
            "The computer science courses are exceptional! The projects are challenging but rewarding, and the instructors provide excellent feedback. Perfect for aspiring programmers.",
        year: "Grade 12",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
];

export const courses: CourseType[] = [
    {
        id: 1,
        title: "Applications on Real Numbers",
        image: "https://dummyimage.com/600x400",
        schoolYear: "Grade 10",
        subject: "Math",
        createdAt: "2022-01-01",
        sessions: 10,
    },
    {
        id: 2,
        title: "Differentiation",
        image: "https://dummyimage.com/600x400",
        schoolYear: "Grade 11",
        subject: "Math",
        createdAt: "2022-01-01",
        sessions: 9,
    },
    {
        id: 3,
        title: "Vectors in 3D space",
        image: "https://dummyimage.com/600x400",
        schoolYear: "Grade 12",
        subject: "Math",
        createdAt: "2022-01-01",
        sessions: 5,
    },
    {
        id: 4,
        title: "Diversity of Living Organisms",
        image: "https://dummyimage.com/600x400",
        schoolYear: "Grade 10",
        subject: "Science",
        createdAt: "2022-01-01",
        sessions: 2,
    },
    {
        id: 5,
        title: "Human Excretion System",
        image: "https://dummyimage.com/600x400",
        schoolYear: "Grade 11",
        subject: "Science",
        createdAt: "2022-01-01",
        sessions: 5,
    },
    {
        id: 6,
        title: "Ohm's Law and Kirchhoff's Law",
        image: "https://dummyimage.com/600x400",
        schoolYear: "Grade 12",
        subject: "Science",
        createdAt: "2022-01-01",
        sessions: 8,
    },
    {
        id: 7,
        title: "Unit 10: Places of Interest",
        image: "https://dummyimage.com/600x400",
        schoolYear: "Grade 10",
        subject: "English",
        createdAt: "2022-01-01",
        sessions: 4,
    },
    {
        id: 8,
        title: "Unit 9: Modern Cultures",
        image: "https://dummyimage.com/600x400",
        schoolYear: "Grade 11",
        subject: "English",
        createdAt: "2022-01-01",
        sessions: 4,
    }
]
