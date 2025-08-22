import { StudentDataTable } from "./student-data-table";
import { useTranslations } from "next-intl";

interface StudentData {
    id: string;
    full_name: string;
    paid_amount: number;
    review?: number;
    questions: number;
    average_score: number;
    courses: string[];
    videos: number;
    exams: number;
    joined_at: string;
    phone_number: string;
    parent_number: string;
}

const studentsData: StudentData[] = [
    {
        id: "1",
        full_name: "John Doe",
        paid_amount: 100,
        review: 4,
        questions: 10,
        average_score: 90,
        courses: ["Math 101", "Physics 201"],
        videos: 20,
        exams: 10,
        joined_at: "2022-01-01",
        phone_number: "01093632618",
        parent_number: "01066573417",
    },
    {
        id: "2",
        full_name: "Jane Smith",
        paid_amount: 150,
        review: 5,
        questions: 15,
        average_score: 95,
        courses: ["Chemistry 101", "Biology 201", "Physics 101"],
        videos: 25,
        exams: 12,
        joined_at: "2022-02-15",
        phone_number: "01012345678",
        parent_number: "01087654321",
    },
    {
        id: "3",
        full_name: "Alex Johnson",
        paid_amount: 200,
        review: 3,
        questions: 5,
        average_score: 75,
        courses: ["English 101", "History 201"],
        videos: 15,
        exams: 8,
        joined_at: "2022-03-10",
        phone_number: "01055551234",
        parent_number: "01055554321",
    },
    {
        id: "4",
        full_name: "Sarah Williams",
        paid_amount: 180,
        review: 5,
        questions: 20,
        average_score: 85,
        courses: ["Computer Science 101", "Math 201", "Physics 101"],
        videos: 30,
        exams: 15,
        joined_at: "2022-04-05",
        phone_number: "01099998888",
        parent_number: "01088889999",
    },
    {
        id: "5",
        full_name: "Michael Brown",
        paid_amount: 120,
        review: 2,
        questions: 8,
        average_score: 65,
        courses: ["Economics 101", "Business 201"],
        videos: 18,
        exams: 9,
        joined_at: "2022-05-20",
        phone_number: "01077776666",
        parent_number: "01066667777",
    },
];

export default function TeacherStudents() {
    const t = useTranslations("TEACHER_DASHBOARD.STUDENTS");

    return (
        <section>
            <header className="mb-8">
                <h1 className="text-3xl font-semibold">{t("title")}</h1>
                <p className="p-lead">
                    {t("description")}
                </p>
            </header>
            <main className="overflow-hidden rounded-2xl border p-6">
                <StudentDataTable data={studentsData} />
            </main>
        </section>
    );
}
