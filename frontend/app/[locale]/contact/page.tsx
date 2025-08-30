"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { contactUser } from "@/lib/api/auth";
import { Loader2 } from "lucide-react";

const Contact = () => {
    const [type_of_message, setTypeOfMessage] = useState<string>("general");
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = useForm<ContactFormData>({
        defaultValues: {
            name: "",
            email: "",
            message: "",
        },
    });
    const types_of_messages = [
        {
            key: "general",
            value: "General Inquiry",
        },
        {
            key: "tech",
            value: "Technical Support",
        },
        {
            key: "billing",
            value: "Billing & Payments",
        },
        {
            key: "enroll",
            value: "Course Enrollment",
        },
        {
            key: "teacher",
            value: "Teacher application",
        },
        {
            key: "feedback",
            value: "Feedback & Suggestions",
        },
        {
            key: "partner",
            value: "Collaboration / Partnership",
        },
        {
            key: "other",
            value: "Other",
        },
    ];

    const onSubmit: SubmitHandler<ContactFormData> = async (
        data: ContactFormData,
    ) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            contactUser({
                ...data,
                type_of_message,
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-2 py-16">
            <div className="mb-4 flex flex-col items-center justify-center gap-4">
                <h1 className="text-4xl font-bold tracking-tighter text-gray-900">
                    Contact Us
                </h1>
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="mx-auto flex min-w-lg flex-col gap-4 rounded-2xl border p-6"
            >
                <div className="input-group">
                    <Label className="mb-2" htmlFor="name">
                        Name
                    </Label>
                    <Input
                        placeholder="Enter your name"
                        type="text"
                        {...register("name", {
                            required: "Name is required",
                        })}
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm">
                            {errors.name.message}
                        </p>
                    )}
                </div>
                <div className="input-group">
                    <Label className="mb-2" htmlFor="email">
                        Email
                    </Label>
                    <Input
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                        })}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">
                            {errors.email.message}
                        </p>
                    )}
                </div>
                <div className="input-group">
                    <Label className="mb-2" htmlFor="type_of_message">
                        Why contact us?
                    </Label>
                    <Select
                        value={type_of_message}
                        onValueChange={(value) => {
                            setTypeOfMessage(value);
                        }}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue
                                placeholder="Select a type of message"
                            />
                        </SelectTrigger>
                        <SelectContent>
                            {/* Loop over array of object of diff keys */}
                            {types_of_messages.map((type) => (
                                <SelectItem key={type.key} value={type.key}>
                                    {type.value}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="input-group">
                    <Label className="mb-2" htmlFor="message">
                        Message
                    </Label>
                    <Textarea
                        className="min-h-[200px]"
                        placeholder="Enter your message"
                        {...register("message")}
                    />
                </div>
                <Button
                    disabled={isSubmitting}
                    className="btn-primary"
                    type="submit"
                >
                    {isSubmitting ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        "Send Message"
                    )}
                </Button>
            </form>
        </div>
    );
};

export default Contact;
