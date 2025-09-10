"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Tag from "@/components/ui/Tag";
import { Edit, FileText, X } from "lucide-react";
import { format } from "timeago.js";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";
import { cities } from "@/constants";
import { updateUser } from "@/lib/api/user";

const ProfileSettingsPage = () => {
    const [user] = useSessionStorage("user_profile", null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<UpdateUserData>({
        full_name: user?.full_name || "",
        email: user?.email || "",
        phone_number: user?.phone_number || "",
        parent_number: user?.parent_number || "",
        birth_date: user?.birth_date || "",
        city: user?.city,
    });

    const handleSubmitUserData = async () => {
        updateUser(formData);
        setIsEditing(false);
        window.location.reload();
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    return (
        <section>
            <header className="mb-8 flex flex-col items-center justify-between gap-6 md:flex-row md:gap-0">
                <h1 className="text-3xl font-bold">My Profile</h1>
                {isEditing ? (
                    <div className="flex items-center gap-2">
                        <Button variant="outline" onClick={handleCancel}>
                            <X /> Cancel
                        </Button>
                        <Button
                            className="btn-primary"
                            onClick={handleSubmitUserData}
                        >
                            <FileText /> Save Changes
                        </Button>
                    </div>
                ) : (
                    <Button
                        variant="outline"
                        onClick={() => setIsEditing(!isEditing)}
                    >
                        <Edit /> Edit
                    </Button>
                )}
            </header>
            <main className="mb-6 flex flex-col items-center gap-6 rounded-2xl border p-6 md:flex-row">
                <div>
                    <Image
                        src={
                            user.profile_img == null
                                ? "/avatar.jpg"
                                : user.profile_img
                        }
                        alt="Profile Image"
                        width={150}
                        height={150}
                        className="rounded-full"
                    />
                </div>
                <div className="flex-1">
                    <h2 className="mb-2 text-center text-2xl font-extrabold md:text-start">
                        {user?.full_name.split(" ")[0]}
                    </h2>
                    <p
                        className={`text-muted-foreground text-center md:text-start ${isEditing ? "mb-4" : ""}`}
                    >
                        {user?.school_year && user?.school_year + "'s Student"}
                        {user?.role === "teacher" && "Teacher"}
                    </p>
                    {isEditing ? (
                        <Select
                            value={formData.city}
                            onValueChange={(value) => {
                                setFormData({
                                    ...formData,
                                    city: value,
                                });
                            }}
                        >
                            <SelectTrigger className="mx-auto my-2 md:mx-0">
                                <SelectValue placeholder={user?.city} />
                            </SelectTrigger>
                            <SelectContent>
                                {cities.map((city) => (
                                    <SelectItem key={city} value={city}>
                                        {city}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    ) : (
                        <p className="text-muted-foreground max-sm:text-center">
                            {user?.city}, Egypt
                        </p>
                    )}
                </div>
            </main>
            <section className="mb-6 rounded-2xl border p-6">
                <header className="mb-4 flex items-center justify-between">
                    <h2 className="text-primary text-2xl font-bold">
                        Personal Information
                    </h2>
                </header>
                <main className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="w-4/5">
                        <Label className="mb-2 font-semibold !text-black dark:!text-white">
                            Full Name
                        </Label>
                        {isEditing ? (
                            <Input
                                type="text"
                                placeholder="Full Name"
                                value={formData.full_name}
                                onChange={(event) =>
                                    setFormData({
                                        ...formData,
                                        full_name: event.target.value,
                                    })
                                }
                            />
                        ) : (
                            <p className="text-muted-foreground">
                                {user?.full_name}
                            </p>
                        )}
                    </div>
                    <div className="w-4/5">
                        <Label className="mb-2 font-semibold !text-black dark:!text-white">
                            Email
                        </Label>
                        {isEditing ? (
                            <Input
                                type="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={(event) =>
                                    setFormData({
                                        ...formData,
                                        email: event.target.value,
                                    })
                                }
                            />
                        ) : (
                            <p className="text-muted-foreground">
                                {user?.email}
                            </p>
                        )}
                    </div>
                    <div className="w-4/5">
                        <Label className="mb-2 font-semibold !text-black dark:!text-white">
                            Phone Number
                        </Label>
                        {isEditing ? (
                            <Input
                                type="tel"
                                placeholder="Phone Number"
                                value={formData.phone_number}
                                onChange={(event) =>
                                    setFormData({
                                        ...formData,
                                        phone_number: event.target.value,
                                    })
                                }
                            />
                        ) : (
                            <p className="text-muted-foreground">
                                {user?.phone_number}
                            </p>
                        )}
                    </div>
                    <div className="w-4/5">
                        <Label className="mb-2 font-semibold !text-black dark:!text-white">
                            Other Phone Number
                        </Label>
                        {isEditing ? (
                            <Input
                                type="tel"
                                placeholder="Other Phone Number"
                                value={formData.parent_number}
                                onChange={(event) =>
                                    setFormData({
                                        ...formData,
                                        parent_number: event.target.value,
                                    })
                                }
                            />
                        ) : (
                            <p className="text-muted-foreground">
                                {user?.parent_number || "N/A"}
                            </p>
                        )}
                    </div>
                </main>
            </section>
            <section className="mb-6 rounded-2xl border p-6">
                <header className="mb-4 flex items-center justify-between">
                    <h2 className="text-primary text-2xl font-bold">
                        Account Information
                    </h2>
                </header>
                <main className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                        <Label className="mb-2 font-semibold !text-black dark:!text-white">
                            Birth Date
                        </Label>
                        {isEditing ? (
                            <Input
                                type="date"
                                placeholder="Birth Date"
                                value={formData.birth_date}
                                onChange={(event) =>
                                    setFormData({
                                        ...formData,
                                        birth_date: event.target.value,
                                    })
                                }
                            />
                        ) : (
                            <p className="text-muted-foreground">
                                {user?.birth_date &&
                                    new Date(
                                        user?.birth_date || "",
                                    ).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                            </p>
                        )}
                    </div>
                    <div className="w-4/5">
                        <Label className="mb-2 font-semibold !text-black dark:!text-white">
                            Role
                        </Label>
                        <p className="text-muted-foreground capitalize">
                            {user?.role}
                        </p>
                    </div>
                </main>
            </section>
            <section className="mb-6 rounded-2xl border p-6">
                <header className="mb-4 flex items-center justify-between">
                    <h2 className="text-primary text-2xl font-bold">
                        Date Information
                    </h2>
                </header>
                <main className="grid grid-cols-2 gap-6">
                    <div className="w-4/5">
                        <Label className="mb-2 font-semibold !text-black dark:!text-white">
                            Joined At
                        </Label>
                        <p className="text-muted-foreground">
                            {format(new Date(user?.created_at))}
                        </p>
                    </div>
                </main>
            </section>
            <section className="mb-6 rounded-2xl border p-6">
                <header className="mb-4 flex items-center justify-between">
                    <h2 className="text-primary text-2xl font-bold">
                        Status Information
                    </h2>
                </header>
                <main className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="w-4/5">
                        <Label className="mb-2 font-semibold !text-black dark:!text-white">
                            Active
                        </Label>
                        {user?.is_active ? (
                            <Tag color="green">Yes</Tag>
                        ) : (
                            <Tag color="red">No</Tag>
                        )}
                    </div>
                    <div className="w-4/5">
                        <Label className="mb-2 font-semibold !text-black dark:!text-white">
                            Verified
                        </Label>
                        {user?.is_verified ? (
                            <Tag color="green">Yes</Tag>
                        ) : (
                            <Tag color="red">No</Tag>
                        )}
                    </div>
                </main>
            </section>
        </section>
    );
};

export default ProfileSettingsPage;
