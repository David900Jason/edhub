import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Verified } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/routing";

const TeacherCard = ({ teacher }: { teacher: UserType }) => {
    return (
        <Card className="group relative h-full overflow-hidden rounded-xl border bg-card shadow-sm transition-all duration-300 hover:shadow-md">
            <CardHeader className="relative z-10 p-6 pt-16">
                <div className="-mt-16 mb-2 flex items-center">
                    <div className="relative h-20 w-20 overflow-hidden rounded-full border-4 border-white bg-white shadow-lg">
                        <Image
                            src={teacher?.profile_img || "/avatar.jpg"}
                            alt={teacher?.full_name || "teacher"}
                            fill
                            className="object-cover"
                            sizes="80px"
                        />
                    </div>
                </div>
                <CardTitle className="mt-2 text-xl font-bold text-foreground">
                    <Link
                        className="flex items-center gap-2 transition-colors hover:text-primary"
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
                <CardDescription className="mt-2 text-sm">
                    <Link href={`tel:${teacher?.phone_number}`}>
                        {teacher?.phone_number}
                    </Link>
                    {teacher?.parent_number && (
                        <Link href={`tel:${teacher?.parent_number}`}>
                            {teacher?.parent_number}
                        </Link>
                    )}
                </CardDescription>
            </CardHeader>
        </Card>
    );
};

export default TeacherCard;
