"use client";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useEffect, useMemo, useState } from "react";
import { toggleActiveAdminUser, getAdminStudents } from "@/lib/api/user";
import { format } from "timeago.js";
import Tag from "@/components/ui/Tag";
import { toast } from "sonner";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Link } from "@/i18n/routing";

type StudentAdmin = {
    id: string;
    profile_img: string;
    full_name: string;
    enrolled_courses: string[];
    email: string;
    phone_number: string;
    parent_number: string;
    birth_date: string;
    city: string;
    is_active: boolean;
    is_verified: boolean;
    last_login: string;
    created_at: string;
    updated_at: string;
};

const StudentsPage = () => {
    const [students, setStudents] = useState<StudentAdmin[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [active, setActive] = useState("all");
    const [courses, setCourses] = useState<string[]>([]);
    const [course, setCourse] = useState("all");
    const [cities, setCities] = useState<string[]>([]);
    const [city, setCity] = useState("all");

    useEffect(() => {
        getAdminStudents().then((res) => {
            // Store Students in the state
            setStudents(res);

            // Loop over the 'enrolled_courses' strings array and store them in the useState
            const enrolledCourses = [
                ...new Set(
                    res.flatMap((user: StudentAdmin) => user.enrolled_courses),
                ),
            ].filter((c) => c !== null);
            setCourses(enrolledCourses as string[]);

            // Loop over the 'city' strings array and store them in the useState
            const cities = [
                ...new Set(res.flatMap((user: StudentAdmin) => user.city)),
            ].filter((c) => c !== null);
            setCities(cities as string[]);
        });
    }, []);

    const filteredStudents = useMemo(() => {
        if (!students) return [];

        return students.filter((student) => {
            // Check Active state and change it into 'active' || 'in-active'
            const studentActive: string = student?.is_active
                ? "active"
                : "in-active";

            // First filter by active status
            const matchesActive = active === "all" || studentActive === active;
            const matchesCourse =
                course === "all" || student.enrolled_courses.includes(course);
            const matchesCity = city === "all" || student.city === city;

            // If there's a search query, also filter by it
            if (searchQuery) {
                return (
                    matchesActive &&
                    (student?.full_name
                        ?.toLowerCase()
                        ?.includes(searchQuery.toLowerCase()) ||
                        student?.email
                            ?.toLowerCase()
                            ?.includes(searchQuery.toLowerCase()) ||
                        student?.phone_number
                            ?.toLowerCase()
                            ?.includes(searchQuery.toLowerCase()) ||
                        student?.parent_number
                            ?.toLowerCase()
                            ?.includes(searchQuery.toLowerCase()))
                );
            }

            return matchesActive && matchesCourse && matchesCity;
        });
    }, [students, searchQuery, active, course, city]);

    const toggleActive = async (id: string) => {
        try {
            const res = await toggleActiveAdminUser(id);
            if (res.message) {
                toast.success("User status updated successfully");
                setStudents((prev) =>
                    prev.map((student) =>
                        student.id === id
                            ? { ...student, is_active: !student.is_active }
                            : student,
                    ),
                );
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section>
            <header className="mb-8">
                <h1 className="text-3xl font-semibold">Students</h1>
                <p className="p-lead">
                    Here&apos;s a table containing all students
                </p>
            </header>
            <main className="rounded-2xl border p-6">
                <div className="mb-4 flex items-center gap-2">
                    <Input
                        placeholder="Search students..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {/* Active State */}
                    <Select
                        value={active}
                        onValueChange={(val) => setActive(val)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select active status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="in-active">Inactive</SelectItem>
                        </SelectContent>
                    </Select>
                    {/* Courses */}
                    <Select onValueChange={(val) => setCourse(val)}>
                        <SelectTrigger>
                            <SelectValue placeholder="..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            {courses.map((course) => (
                                <SelectItem key={course} value={course}>
                                    {course}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {/* Cities */}
                    <Select onValueChange={(val) => setCity(val)}>
                        <SelectTrigger>
                            <SelectValue placeholder="..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            {cities.map((city) => (
                                <SelectItem key={city} value={city}>
                                    {city}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Table className="scroll-m-7">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="p-4">Full Name</TableHead>
                            <TableHead className="p-4">Email</TableHead>
                            <TableHead className="p-4">Phone Number</TableHead>
                            <TableHead className="p-4">Parent Number</TableHead>
                            <TableHead className="p-4">Birth Date</TableHead>
                            <TableHead className="p-4">
                                Enrolled Courses
                            </TableHead>
                            <TableHead className="p-4">City</TableHead>
                            <TableHead className="p-4">Active</TableHead>
                            <TableHead className="p-4">Last Login</TableHead>
                            <TableHead className="p-4">Created At</TableHead>
                            <TableHead className="p-4">Updated At</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredStudents.map((student, index) => (
                            <TableRow key={index}>
                                <TableCell className="gap-2 p-4">
                                    <div className="flex items-center gap-2">
                                        <Image
                                            src={
                                                student.profile_img ||
                                                "/avatar.jpg"
                                            }
                                            alt={student.full_name}
                                            className="rounded-full"
                                            width={28}
                                            height={28}
                                        />
                                        <span>{student.full_name}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="p-4">
                                    {student.email}
                                </TableCell>
                                <TableCell className="p-4">
                                    {student.phone_number || "N/A"}
                                </TableCell>
                                <TableCell className="p-4">
                                    {student.parent_number || "N/A"}
                                </TableCell>
                                <TableCell className="p-4">
                                    {student.birth_date || "N/A"}
                                </TableCell>
                                <TableCell className="flex flex-wrap gap-2 p-4">
                                    {student.enrolled_courses.length > 0 ? (
                                        student.enrolled_courses.map(
                                            (course) => {
                                                return (
                                                    <Tag
                                                        color="yellow"
                                                        key={course}
                                                    >
                                                        <Link href={`/dashboard/admin/courses?search=${course}`}>
                                                            {course}
                                                        </Link>
                                                    </Tag>
                                                );
                                            },
                                        )
                                    ) : (
                                        <Tag color="yellow">N/A</Tag>
                                    )}
                                </TableCell>
                                <TableCell className="p-4">
                                    {student.city || "N/A"}
                                </TableCell>
                                <TableCell
                                    className="cursor-pointer p-4 transition-all hover:scale-105"
                                    onClick={() => toggleActive(student.id)}
                                >
                                    <Tag
                                        color={
                                            student.is_active ? "green" : "red"
                                        }
                                    >
                                        {student.is_active
                                            ? "Active"
                                            : "Inactive"}
                                    </Tag>
                                </TableCell>
                                <TableCell className="p-4">
                                    <span className="text-muted-foreground text-xs">
                                        {format(student.last_login)}
                                    </span>
                                </TableCell>
                                <TableCell className="p-4">
                                    <span className="text-muted-foreground text-xs">
                                        {format(student.created_at)}
                                    </span>
                                </TableCell>
                                <TableCell className="p-4">
                                    <span className="text-muted-foreground text-xs">
                                        {format(student.updated_at)}
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableCaption className="mb-4">
                        {filteredStudents?.length === 0
                            ? "No students found"
                            : "A list of platform students"}
                    </TableCaption>
                </Table>
            </main>
        </section>
    );
};

export default StudentsPage;
