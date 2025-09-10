import {
    BookOpen,
    Group,
    User,
    Video,
    Home,
    Book,
    Award,
    DollarSign,
    Pen,
    List,
    Users,
    CircleQuestionMark,
    MessageCircleQuestion,
    GraduationCap,
    CreditCard,
    MessageCircle,
} from "lucide-react";

const stats = [
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
const reviews: ReviewType[] = [
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

const dashboardLinks = [
    {
        title: "Home",
        href: "/dashboard/student",
        icon: Home,
    },
    {
        title: "My Courses",
        href: "/dashboard/student/courses",
        icon: BookOpen,
    },
    {
        title: "Teachers",
        href: "/dashboard/student/teachers",
        icon: GraduationCap,
    },
    {
        title: "Subscriptions",
        href: "/dashboard/student/subscriptions",
        icon: DollarSign,
    },
    {
        title: "Todo List",
        href: "/dashboard/student/todo-list",
        icon: List,
    },
    {
        title: "Notes",
        href: "/dashboard/student/notes",
        icon: Pen,
    },
];

const TeacherDashboardLinks = [
    {
        title: "Home",
        href: "/dashboard/teacher",
        icon: Home,
    },
    {
        title: "Courses",
        href: "/dashboard/teacher/courses",
        icon: BookOpen,
    },
    {
        title: "Students",
        href: "/dashboard/teacher/students",
        icon: Users,
    },
    {
        title: "Videos",
        href: "/dashboard/teacher/videos",
        icon: Video,
    },
    {
        title: "Books",
        href: "/dashboard/teacher/books",
        icon: Book,
    },
    {
        title: "Q&A",
        href: "/dashboard/teacher/qa",
        icon: MessageCircleQuestion,
    },
    // {
    //     title: "Assignments (⏳)",
    //     href: "/dashboard/teacher/assignments",
    //     icon: Pen,
    // },
    // {
    //     title: "Exams (⏳)",
    //     href: "/dashboard/teacher/exams",
    //     icon: Award,
    // },
    // {
    //     title: "Quizzes (⏳)",
    //     href: "/dashboard/teacher/quizzes",
    //     icon: CircleQuestionMark,
    // }
];

const AdminDashboardLinks = [
    {
        title: "Home",
        href: "/dashboard/admin",
        icon: Home,
    },
    {
        title: "Students",
        href: "/dashboard/admin/students",
        icon: Users
    },
    {
        title: "Teachers",
        href: "/dashboard/admin/teachers",
        icon: GraduationCap
    },
    {
        title: "Subscriptions",
        href: "/dashboard/admin/subscriptions",
        icon: CreditCard
    },
    {
        title: "Courses",
        href: "/dashboard/admin/courses",
        icon: BookOpen
    },
    {
        title: "Videos",
        href: "/dashboard/admin/videos",
        icon: Video
    },
    {
        title: "Books",
        href: "/dashboard/admin/books",
        icon: Book
    },
    {
        title: "Messages",
        href: "/dashboard/admin/contact",
        icon: MessageCircle
    }
]

const ProfileButtonLinks: ProfileButtonLinksType[] = [
    {
        label: "Dashboard",
        href: "/dashboard/",
        icon: Home,
    },
    {
        label: "My Courses",
        href: "/dashboard/student/courses",
        icon: BookOpen,
    },
    {
        label: "Payments",
        href: "/dashboard/student/subscriptions",
        icon: DollarSign,
    },
    {
        label: "Todo List",
        href: "/dashboard/student/todo-list",
        icon: List,
    },
];

const TeacherProfileButtonLinks: ProfileButtonLinksType[] = [
    {
        label: "Dashboard",
        href: "/dashboard/teacher",
        icon: Home,
    },
    {
        label: "My Courses",
        href: "/dashboard/teacher/courses",
        icon: BookOpen,
    },
    {
        label: "Q&A",
        href: "/dashboard/teacher/qa",
        icon: MessageCircleQuestion,
    },
    {
        label: "Students",
        href: "/dashboard/teacher/students",
        icon: Users,
    },
];

const AdminProfileButtonLinks: ProfileButtonLinksType[] = [
    {
        label: "Dashboard",
        href: "/dashboard/admin",
        icon: Home,
    },
    {
        label: "Courses",
        href: "/dashboard/admin/courses",
        icon: BookOpen,
    },
    {
        label: "Students",
        href: "/dashboard/admin/students",
        icon: Users,
    },
    {
        label: "Teachers",
        href: "/dashboard/admin/teachers",
        icon: GraduationCap,
    },
];

const dummyTasksData = [
    {
        task: "Complete Math Assignment",
        checked: false,
    },
    {
        task: "Read Science Chapter 5",
        checked: false,
    },
    {
        task: "Finish History Project",
        checked: true,
    },
    {
        task: "Prepare for English Test",
        checked: true,
    },
    {
        task: "Attend Chemistry Lab",
        checked: false,
    },
    {
        task: "Submit Art Assignment",
        checked: false,
    },
];

const dashboardHomeCards = [
    {
        title: "Exams",
        icon: Award,
        description: "you took recently.",
    },
    {
        title: "Courses",
        icon: BookOpen,
        description: "you joined recently.",
    },
    {
        title: "Sessions",
        icon: Book,
        description: "you joined recently.",
    },
    {
        title: "Assignments",
        icon: Book,
        description: "delievered on time.",
    },
];

// Create cities
const cities = [
    "Cairo",
    "Giza",
    "Alexandria",
    "Dakahlia",
    "Red Sea",
    "Beheira",
    "Fayoum",
    "Gharbia",
    "Ismailia",
    "Menoufia",
    "Minya",
    "Qalyubia",
    "New Valley",
    "Suez",
    "Aswan",
    "Asyut",
    "Beni Suef",
    "Port Said",
    "Damietta",
    "Sharkia",
    "South Sinai",
    "Kafr El Sheikh",
    "Matrouh",
    "Luxor",
    "Qena",
    "North Sinai",
    "Sohag",
];

export {
    stats,
    reviews,
    dashboardLinks,
    TeacherDashboardLinks,
    AdminDashboardLinks,
    dashboardHomeCards,
    ProfileButtonLinks,
    TeacherProfileButtonLinks,
    AdminProfileButtonLinks,
    dummyTasksData,
    cities,
};
