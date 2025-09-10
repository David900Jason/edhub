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
import { format } from "timeago.js";
import { useTranslations, useLocale } from "next-intl";
import Tag from "@/components/ui/Tag";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Clipboard } from "lucide-react";

const BillingHistory = ({ invoices }: { invoices: InvoiceType[] }) => {
    const t = useTranslations("STUDENT_DASHBOARD");
    const locale = useLocale();
    return (
        <main className="mt-4 overflow-hidden rounded-xl border p-6">
            <h2 className="text-xl font-semibold">
                {t("SUBSCRIPTIONS.card5.title")}
            </h2>
            <p className="p-lead">{t("SUBSCRIPTIONS.card5.description")}</p>
            <div>
                <Table className="mt-6">
                    <TableCaption className="mb-4">
                        {t("SUBSCRIPTIONS.card5.table.caption")}
                    </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead
                                className={
                                    locale === "ar" ? "text-right" : "text-left"
                                }
                            >
                                ID
                            </TableHead>
                            <TableHead
                                className={
                                    locale === "ar" ? "text-right" : "text-left"
                                }
                            >
                                {t("SUBSCRIPTIONS.card5.table.head1")}
                            </TableHead>
                            <TableHead
                                className={
                                    locale === "ar" ? "text-right" : "text-left"
                                }
                            >
                                {t("SUBSCRIPTIONS.card5.table.head5")}
                            </TableHead>
                            <TableHead
                                className={
                                    locale === "ar" ? "text-right" : "text-left"
                                }
                            >
                                {t("SUBSCRIPTIONS.card5.table.head6")}
                            </TableHead>
                            <TableHead>Code</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {invoices.map((invoice, index) => (
                            <TableRow
                                key={index}
                                className={
                                    invoice.is_used
                                        ? "pointer-events-none cursor-not-allowed opacity-50"
                                        : ""
                                }
                            >
                                <TableCell>{invoice.payment_id}</TableCell>
                                <TableCell className="py-4">
                                    {format(invoice.created_at)}
                                </TableCell>
                                <TableCell className="font-semibold">
                                    {Number(invoice?.amount)?.toFixed(2)}{" "}
                                    {t("SUBSCRIPTIONS.currency")}
                                </TableCell>
                                <TableCell>
                                    <Tag
                                        color={
                                            invoice?.is_used ? "green" : "red"
                                        }
                                    >
                                        {invoice?.is_used
                                            ? "Activated"
                                            : "Not Activated"}
                                    </Tag>
                                </TableCell>
                                <TableCell className="flex items-center gap-6">
                                    {invoice?.code}
                                    <Button
                                        title="Copy to clipboard"
                                        variant="outline"
                                        size="icon"
                                        onClick={() => {
                                            navigator.clipboard.writeText(
                                                invoice?.code,
                                            );
                                            toast.info("Copied to clipboard", {
                                                duration: 2000,
                                                position: "top-center",
                                            });
                                        }}
                                    >
                                        <Clipboard />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </main>
    );
};

export default BillingHistory;
