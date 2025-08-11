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
import Tag from "@/components/ui/Tag";
import { Card } from "@/components/ui/card";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface Invoice {
    date: string;
    paymentId: string;
    paymentMethod: string;
    amount: number;
    status: "active" | "inactive";
    course: string;
    category: string;
    teacher: string;
}

const invoices: Invoice[] = [
    {
        date: "2023-06-01",
        paymentId: "CRS-1267",
        paymentMethod: "Digital Wallet",
        amount: 300,
        status: "active",
        course: "Course 1",
        category: "Math",
        teacher: "Teacher 1",
    },
    {
        date: "2023-06-02",
        paymentId: "CRS-1268",
        paymentMethod: "Digital Wallet",
        amount: 300,
        status: "active",
        course: "Course 2",
        category: "Math",
        teacher: "Teacher 2",
    },
    {
        date: "2023-06-03",
        paymentId: "CRS-1269",
        paymentMethod: "Digital Wallet",
        amount: 750,
        status: "active",
        course: "Course 3",
        category: "Math",
        teacher: "Teacher 3",
    },
    {
        date: "2023-06-04",
        paymentId: "CRS-1270",
        paymentMethod: "Digital Wallet",
        amount: 300,
        status: "active",
        course: "Course 4",
        category: "Math",
        teacher: "Teacher 4",
    },
    {
        date: "2023-06-05",
        paymentId: "CRS-1271",
        paymentMethod: "Digital Wallet",
        amount: 750,
        status: "inactive",
        course: "Course 5",
        category: "Math",
        teacher: "Teacher 5",
    },
];

const Subscriptions = () => {
    const [user] = useLocalStorage("user", null);

    return (
        <>
            <section className="max-w-[calc(100vw-58px)] flex-1 sm:max-w-[calc(100vw-256px)]">
                <header className="mb-8">
                    <h1 className="text-3xl font-semibold">
                        Your Subscriptions
                    </h1>
                    <p className="p-lead">
                        Manage your subscriptions and access your favorite
                        content.
                    </p>
                </header>
                <aside className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    <Card className="flex flex-col gap-2 rounded-xl border p-6 py-12">
                        <span>
                            <span className="font-mono text-5xl font-semibold tracking-tighter">
                                {Number(user?.wallet_balance).toFixed(1)}
                            </span>{" "}
                            <span className="text-muted-foreground text-sm font-semibold tracking-normal">
                                EGP
                            </span>
                        </span>
                        <p className="p-lead">Wallet Balance</p>
                    </Card>
                    <Card className="flex flex-col gap-2 rounded-xl border p-6 py-12">
                        <span>
                            <span className="font-mono text-5xl font-semibold tracking-tighter">
                                5
                            </span>
                        </span>
                        <p className="p-lead">Total Courses</p>
                    </Card>
                    <Card className="flex flex-col gap-2 rounded-xl border p-6 py-12">
                        <span>
                            <span className="font-mono text-5xl font-semibold tracking-tighter">
                                {Number(
                                    invoices.reduce(
                                        (total, invoice) =>
                                            total + invoice.amount,
                                        0,
                                    ) / invoices.length,
                                ).toFixed(1)}
                            </span>
                        </span>
                        <p className="p-lead">Average</p>
                    </Card>
                    <Card className="flex flex-col gap-2 rounded-xl border p-6 py-12">
                        <span>
                            <span className="font-mono text-5xl font-semibold tracking-tighter">
                                {invoices
                                    .reduce(
                                        (total, invoice) =>
                                            total + invoice.amount,
                                        0,
                                    )
                                    .toFixed(1)}
                            </span>{" "}
                            <span className="text-muted-foreground text-sm font-semibold tracking-normal">
                                EGP
                            </span>
                        </span>
                        <p className="p-lead">Total Spent</p>
                    </Card>
                </aside>
                <main className="mt-6 overflow-hidden rounded-xl border p-6">
                    <h2 className="text-xl font-semibold">Billing History</h2>
                    <p className="p-lead">
                        Check your billing history and manage your
                        subscriptions.
                    </p>
                    <div>
                        <Table className="mt-6">
                            <TableCaption className="text-muted-foreground text-sm">
                                A list of your subscriptions.
                            </TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Payment ID</TableHead>
                                    <TableHead>Payment Method</TableHead>
                                    <TableHead>Course</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Teacher</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {invoices.map((invoice) => (
                                    <TableRow key={invoice.paymentId}>
                                        <TableCell className="py-4">
                                            {invoice.date}
                                        </TableCell>
                                        <TableCell>
                                            {invoice.paymentId}
                                        </TableCell>
                                        <TableCell>
                                            <Tag color="blue">
                                                {invoice.paymentMethod}
                                            </Tag>
                                        </TableCell>
                                        <TableCell>{invoice.course}</TableCell>
                                        <TableCell>
                                            {invoice.category}
                                        </TableCell>
                                        <TableCell>{invoice.teacher}</TableCell>
                                        <TableCell className="font-semibold">
                                            {invoice.amount.toFixed(2)} EGP
                                        </TableCell>
                                        <TableCell>
                                            <Tag
                                                color={
                                                    invoice.status === "active"
                                                        ? "green"
                                                        : "red"
                                                }
                                            >
                                                {invoice.status}
                                            </Tag>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </main>
            </section>
        </>
    );
};

export default Subscriptions;
