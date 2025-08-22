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
import { useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useState } from "react";
import { format } from "timeago.js";
import { getInvoicesByUserId } from "@/lib/api/course";
import { useTranslations, useLocale } from "next-intl";

const Subscriptions = () => {
    const [user] = useLocalStorage("user", null);
    const [invoices, setInvoices] = useState<InvoiceType[]>([]);
    const t = useTranslations("STUDENT_DASHBOARD");
    const locale = useLocale();

    useEffect(() => {
        const fetchEnrollments = async () => {
            const enrollments = await getInvoicesByUserId(user?.id || "");
            setInvoices(enrollments);
        };
        fetchEnrollments();
    }, [invoices]);

    const averageCost = Number(
        invoices.reduce((total, invoice) => total + (invoice.price || 0), 0) /
            invoices.length,
    ).toFixed(1);

    const totalCost = Number(
        invoices.reduce((total, invoice) => total + (invoice.price || 0), 0),
    ).toFixed(1);

    return (
        <>
            <section className="max-w-[calc(100vw-58px)] flex-1 sm:max-w-[calc(100vw-256px)]">
                <header className="mb-8">
                    <h1 className="text-3xl font-semibold">
                        {t("SUBSCRIPTIONS.title")}
                    </h1>
                    <p className="p-lead">
                        {t("SUBSCRIPTIONS.description")}
                    </p>
                </header>
                <aside className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    <Card className="flex flex-col gap-2 rounded-xl border p-6 py-12">
                        <span>
                            <span className="font-mono text-5xl font-semibold tracking-tighter">
                                {Number(user?.wallet_balance).toFixed(1)}
                            </span>{" "}
                            <span className="text-muted-foreground text-sm font-semibold tracking-normal">
                                {t("SUBSCRIPTIONS.currency")}
                            </span>
                        </span>
                        <p className="p-lead">{t("SUBSCRIPTIONS.card1")}</p>
                    </Card>
                    <Card className="flex flex-col gap-2 rounded-xl border p-6 py-12">
                        <span>
                            <span className="font-mono text-5xl font-semibold tracking-tighter">
                                {invoices.length}
                            </span>
                        </span>
                        <p className="p-lead">{t("SUBSCRIPTIONS.card2")}</p>
                    </Card>
                    <Card className="flex flex-col gap-2 rounded-xl border p-6 py-12">
                        <span>
                            <span className="font-mono text-5xl font-semibold tracking-tighter">
                                {averageCost}
                            </span>{" "}
                            <span className="text-muted-foreground text-sm font-semibold tracking-normal">
                                {t("SUBSCRIPTIONS.currency")}
                            </span>
                        </span>
                        <p className="p-lead">{t("SUBSCRIPTIONS.card3")}</p>
                    </Card>
                    <Card className="flex flex-col gap-2 rounded-xl border p-6 py-12">
                        <span>
                            <span className="font-mono text-5xl font-semibold tracking-tighter">
                                {totalCost}
                            </span>{" "}
                            <span className="text-muted-foreground text-sm font-semibold tracking-normal">
                                {t("SUBSCRIPTIONS.currency")}
                            </span>
                        </span>
                        <p className="p-lead">{t("SUBSCRIPTIONS.card4")}</p>
                    </Card>
                </aside>
                <main className="mt-6 overflow-hidden rounded-xl border p-6">
                    <h2 className="text-xl font-semibold">
                        {t("SUBSCRIPTIONS.card5.title")}
                    </h2>
                    <p className="p-lead">
                        {t("SUBSCRIPTIONS.card5.description")}
                    </p>
                    <div>
                        <Table className="mt-6">
                            <TableCaption className="text-muted-foreground text-sm">
                                {t("SUBSCRIPTIONS.card5.table.caption")}
                            </TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className={locale === "ar" ? "text-right" : "text-left"}>{t("SUBSCRIPTIONS.card5.table.head1")}</TableHead>
                                    <TableHead className={locale === "ar" ? "text-right" : "text-left"}>{t("SUBSCRIPTIONS.card5.table.head2")}</TableHead>
                                    <TableHead className={locale === "ar" ? "text-right" : "text-left"}>{t("SUBSCRIPTIONS.card5.table.head3")}</TableHead>
                                    <TableHead className={locale === "ar" ? "text-right" : "text-left"}>{t("SUBSCRIPTIONS.card5.table.head4")}</TableHead>
                                    <TableHead className={locale === "ar" ? "text-right" : "text-left"}>{t("SUBSCRIPTIONS.card5.table.head5")}</TableHead>
                                    <TableHead className={locale === "ar" ? "text-right" : "text-left"}>{t("SUBSCRIPTIONS.card5.table.head6")}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {invoices.map((invoice) => (
                                    <TableRow key={invoice.id}>
                                        <TableCell>
                                            {invoice.payment_id}
                                        </TableCell>
                                        <TableCell className="py-4">
                                            {format(invoice.enrolled_at)}
                                        </TableCell>
                                        <TableCell>
                                            {invoice.course_name}
                                        </TableCell>
                                        <TableCell>
                                            {invoice.teacher_name}
                                        </TableCell>
                                        <TableCell className="font-semibold">
                                            {invoice.price?.toFixed(2)} {t("SUBSCRIPTIONS.currency")}
                                        </TableCell>
                                        <TableCell>
                                            <Tag
                                                color={
                                                    invoice?.status === "active"
                                                        ? "green"
                                                        : "red"
                                                }
                                            >
                                                {invoice?.status}
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
