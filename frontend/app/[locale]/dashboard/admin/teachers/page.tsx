"use client";

import {
    Table,
    TableHeader,
    TableRow,
    TableCell,
    TableHead,
    TableBody,
    TableCaption,
} from "@/components/ui/table";
import Tag from "@/components/ui/Tag";
import { Link } from "@/i18n/routing";
import {
    getAdminTeachers,
    toggleActiveAdminUser,
    toggleVerifiedAdminUser,
} from "@/lib/api/user";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { format } from "timeago.js";

type TeacherAdmin = {
    id: string;
    profile_img: string;
    full_name: string;
    created_courses: string[];
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

const TeachersPage = () => {
    const [teachers, setTeachers] = useState<TeacherAdmin[]>([]);

    useEffect(() => {
        getAdminTeachers().then((res) => {
            setTeachers(res);
        });
    }, []);

    // Check the time left since "created_at"
    const timeLeft = (createdAt: string): number => {
        const now = new Date();
        const created = new Date(createdAt);
        const diff = now.getTime() - created.getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        return 14 - days;
    };

    const toggleVerified = async (id: string) => {
        try {
            const res = await toggleVerifiedAdminUser(id);
            if (res.message) {
                toast.success("User status updated successfully");
                setTeachers((prev) =>
                    prev.map((teacher) =>
                        teacher.id === id
                            ? { ...teacher, is_verified: !teacher.is_verified }
                            : teacher,
                    ),
                );
            }
            // window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    const toggleActive = async (id: string) => {
        try {
            const res = await toggleActiveAdminUser(id);
            if (res.message) {
                toast.success("User status updated successfully");
                setTeachers((prev) =>
                    prev.map((teacher) =>
                        teacher.id === id
                            ? { ...teacher, is_active: !teacher.is_active }
                            : teacher,
                    ),
                );
            }
            // window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section>
            <header className="mb-8">
                <h1 className="text-3xl font-semibold">Teachers</h1>
                <p className="p-lead">
                    Here&apos;s a table containing all teachers
                </p>
            </header>
            <main className="rounded-2xl border p-6">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="p-4">Full Name</TableHead>
                            <TableHead className="p-4">Email</TableHead>
                            <TableHead className="p-4">
                                Created Courses
                            </TableHead>
                            <TableHead className="p-4">Phone Number</TableHead>
                            <TableHead className="p-4">Parent Number</TableHead>
                            <TableHead className="p-4">Birth Date</TableHead>
                            <TableHead className="p-4">City</TableHead>
                            <TableHead className="p-4">Active</TableHead>
                            <TableHead className="p-4">Verified</TableHead>
                            <TableHead className="p-4">Created At</TableHead>
                            <TableHead className="p-4">Updated At</TableHead>
                            <TableHead className="p-4">Trial</TableHead>
                            <TableHead className="p-4">Last Login</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {teachers?.map((teacher, index) => (
                            <TableRow key={index}>
                                <TableCell className="p-4 pe-8">
                                    <div className="flex items-center gap-2">
                                        <Image
                                            src={
                                                teacher.profile_img ||
                                                "/avatar.jpg"
                                            }
                                            alt={teacher.full_name}
                                            width={28}
                                            height={28}
                                            className="rounded-full"
                                        />
                                        <p>{teacher.full_name}</p>
                                    </div>
                                </TableCell>
                                <TableCell className="p-4">
                                    {teacher.email}
                                </TableCell>
                                <TableCell className="flex flex-wrap gap-2 p-4">
                                    {teacher.created_courses.length > 0 ? (
                                        teacher.created_courses.map(
                                            (course, index) => (
                                                <Tag color="yellow" key={index}>
                                                    <Link
                                                        href={`/dashboard/admin/courses?search=${course}`}
                                                    >
                                                        {course}
                                                    </Link>
                                                </Tag>
                                            ),
                                        )
                                    ) : (
                                        <Tag color="yellow">N/A</Tag>
                                    )}
                                </TableCell>
                                <TableCell className="p-4">
                                    {teacher.phone_number || (
                                        <span className="text-xs text-gray-500">
                                            N/A
                                        </span>
                                    )}
                                </TableCell>
                                <TableCell className="p-4">
                                    {teacher.parent_number || (
                                        <span className="text-xs text-gray-500">
                                            N/A
                                        </span>
                                    )}
                                </TableCell>
                                <TableCell className="p-4">
                                    {teacher.birth_date || (
                                        <span className="text-xs text-gray-500">
                                            N/A
                                        </span>
                                    )}
                                </TableCell>
                                <TableCell className="p-4">
                                    {teacher.city}
                                </TableCell>
                                <TableCell
                                    onClick={() => toggleActive(teacher.id)}
                                    className="cursor-pointer p-4 transition-all hover:scale-105"
                                >
                                    <Tag
                                        color={
                                            teacher.is_active ? "green" : "red"
                                        }
                                    >
                                        {teacher.is_active
                                            ? "Active"
                                            : "Inactive"}
                                    </Tag>
                                </TableCell>
                                <TableCell
                                    onClick={() => toggleVerified(teacher.id)}
                                    className="cursor-pointer p-4 transition-all hover:scale-105"
                                >
                                    <Tag
                                        color={
                                            teacher.is_verified
                                                ? "green"
                                                : "red"
                                        }
                                    >
                                        {teacher.is_verified
                                            ? "Verified"
                                            : "Not Verified"}
                                    </Tag>
                                </TableCell>
                                <TableCell className="p-4 text-xs text-gray-500">
                                    {format(teacher.created_at)}
                                </TableCell>
                                <TableCell className="p-4 text-xs text-gray-500">
                                    {format(teacher.updated_at)}
                                </TableCell>
                                <TableCell className="p-4 text-xs text-gray-500">
                                    {timeLeft(teacher.created_at) <= 0 ? (
                                        <span className="text-red-500">
                                            Expired (
                                            {-timeLeft(teacher.created_at)} days
                                            ago)
                                        </span>
                                    ) : (
                                        <span className="text-green-500">
                                            {timeLeft(teacher.created_at)} days
                                            left
                                        </span>
                                    )}
                                </TableCell>
                                <TableCell className="p-4 text-xs text-gray-500">
                                    {format(teacher.last_login)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableCaption className="mb-4">
                        {teachers?.length === 0
                            ? "No teachers found"
                            : `${teachers?.length} teachers`}
                    </TableCaption>
                </Table>
            </main>
        </section>
    );
};

export default TeachersPage;
