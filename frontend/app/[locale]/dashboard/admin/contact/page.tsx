"use client";

import { useState, useEffect } from "react";
import { getMessages } from "@/lib/api/auth";
import Image from "next/image";
import Tag from "@/components/ui/Tag";
import Link from "next/link";

interface Message {
    id: string;
    name: string;
    email: string;
    message: string;
    created_at: string;
    type: string;
}

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

const Contact = () => {
    const [messages, setMessages] = useState<Message[] | null>(null);

    useEffect(() => {
        getMessages().then((res) => setMessages(res || []));
    }, [setMessages]);

    return (
        <section>
            <header className="mb-8">
                <h1 className="text-3xl font-semibold">Messages</h1>
                <p className="p-lead">View all messages users asked</p>
            </header>
            <main className="rounded-2xl border p-6">
                {messages && (
                    <div className="flex flex-col gap-4">
                        {messages.map((message: Message, index: number) => (
                            <div
                                key={index}
                                className="flex items-start justify-between rounded-2xl border p-6"
                            >
                                <div className="flex items-start gap-4">
                                    <Image
                                        src="/avatar.jpg"
                                        alt="avatar"
                                        width={48}
                                        height={48}
                                        className="rounded-full"
                                    />
                                    <header>
                                        <h3 className="text-primary text-xl font-semibold">
                                            {message.name}
                                        </h3>
                                        <p className="text-muted-foreground text-sm">
                                            <Link
                                                href={`mailto:${message.email}`}
                                            >
                                                {message.email}
                                            </Link>
                                        </p>
                                        <p className="mt-4">
                                            {message.message}
                                        </p>
                                    </header>
                                </div>
                                <div>
                                    <p className="text-primary text-sm font-semibold">
                                        <Tag color="purple">
                                            {
                                                types_of_messages.find(
                                                    (type) =>
                                                        type.key ===
                                                        (message.type as string),
                                                )?.value
                                            }
                                        </Tag>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {!messages && (
                    <div className="flex min-h-[40vh] items-center justify-center">
                        <p className="text-center">No messages found</p>
                    </div>
                )}
            </main>
        </section>
    );
};

export default Contact;
