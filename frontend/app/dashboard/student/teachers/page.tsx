import Image from "next/image";
import Link from "next/link";
import { getAllTeachers } from "@/lib/api/user";
import { Button } from "@/components/ui/button";

const TeachersPage = async () => {
    const teachers: UserType[] | undefined = await getAllTeachers();
    console.log(teachers);

    return (
        <section>
            <header className="mb-8">
                <h1 className="text-3xl font-semibold">Teachers</h1>
                <p className="p-lead">
                    Browse different teachers and find the one that best matches
                    your learning style.
                </p>
            </header>
            <main className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {teachers &&
                    teachers.map((teacher) => (
                        <div
                            key={teacher.id}
                            className="mb-4 flex flex-col items-center gap-5 rounded-lg border p-6"
                        >
                            <Image
                                src={teacher.image || ""}
                                alt="user"
                                width={100}
                                height={100}
                                className="rounded-full"
                            />
                            <div className="text-center">
                                <h2 className="text-lg font-semibold">
                                    {teacher.full_name}
                                </h2>
                                <p className="p-lead">
                                    <Link href={`tel:${teacher.phone_number}`}>
                                        {teacher.phone_number}
                                    </Link>
                                </p>
                                <p className="p-lead">{teacher.city}</p>
                            </div>
                            <Button
                                variant="default"
                                className="w-full btn-primary"
                                asChild
                            >
                                <Link href={`/dashboard/student/teachers/${teacher.id}`}>
                                    Checkout courses
                                </Link>
                            </Button>
                        </div>
                    ))}
            </main>
        </section>
    );
};

export default TeachersPage;
