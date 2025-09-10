import React from "react";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Verified } from "lucide-react";

const TeacherCard = ({ teacher }: { teacher: UserType }) => {
    return (
        <Card className="group bg-card relative h-full overflow-hidden rounded-xl border shadow-sm transition-all duration-300 hover:shadow-md">
            <CardHeader className="relative z-10 p-6 pt-16">
                <div className="-mt-16 mb-2 flex items-center">
                    <figure className="relative h-20 w-20 overflow-hidden rounded-full border-4 border-white bg-white shadow-lg">
                        <Image
                            src={teacher?.profile_img || "/avatar.jpg"}
                            alt={teacher?.full_name || "teacher"}
                            className="object-cover"
                            sizes="80px"
                            fill
                        />
                    </figure>
                </div>
                <CardTitle className="text-foreground mt-2 text-xl font-bold">
                    <Link
                        className="hover:text-primary flex items-center gap-2 transition-colors"
                        aria-label={`View courses by ${teacher?.full_name}`}
                        href={`/courses?search=${teacher?.full_name}`}
                    >
                        {teacher?.full_name}
                        {teacher?.is_verified && (
                            <Verified
                                aria-label="Verified Teacher"
                                className="h-5 w-5 text-blue-500"
                                size={24}
                            />
                        )}
                    </Link>
                </CardTitle>
                <CardDescription className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                    <Link href={`tel:${teacher?.phone_number}`}>
                        {teacher?.phone_number}
                    </Link>
                    {teacher?.parent_number && (
                        <>
                            <span className="text-gray-500">|</span>
                            <Link href={`tel:${teacher?.parent_number}`}>
                                {teacher?.parent_number}
                            </Link>
                        </>
                    )}
                </CardDescription>
            </CardHeader>
        </Card>
    );
};

export default TeacherCard;
