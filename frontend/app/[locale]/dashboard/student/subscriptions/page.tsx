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
import { useState } from "react";
import { format } from "timeago.js";
import {
    getUserTransactions,
    getUserWallet,
    updateWallet,
} from "@/lib/api/course";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Bolt, CircleCheck, Clipboard, X } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

type WalletType = {
    id: string;
    balance: number;
    currency: string;
    created_at: string;
};

const Subscriptions = () => {
    const [invoices, setInvoices] = useState<InvoiceType[]>([]);
    const [userWallet, setUserWallet] = useState<WalletType | null>(null);
    const [code, setCode] = useState<string>("");

    useEffect(() => {
        const fetchInvoices = async () => {
            const payments = await getUserTransactions();
            setInvoices((prev) => [...prev, ...payments]);
        };

        const fetchUserWallet = async () => {
            const wallet = await getUserWallet();
            setUserWallet(() => {
                return wallet;
            });
        };
        fetchUserWallet();
        fetchInvoices();
    }, []);

    const handleTopUpWallet = async () => {
        try {
            const response = await updateWallet(code);

            if (response) {
                toast("Code added to wallet successfully", {
                    duration: 2000,
                    icon: <CircleCheck />,
                    position: "top-center",
                });
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
            toast("Failed to add code to wallet", {
                duration: 2000,
                icon: <X />,
                position: "top-center",
            });
        }
    };

    const t = useTranslations("STUDENT_DASHBOARD");
    const locale = useLocale();

    const averageCost = Number(
        invoices.reduce(
            (total, invoice) => total + (Number(invoice.amount) || 0),
            0,
        ) / invoices.length,
    ).toFixed(1);

    const totalCost = Number(
        invoices.reduce(
            (total, invoice) => total + (Number(invoice.amount) || 0),
            0,
        ),
    ).toFixed(1);

    return (
        <>
            <section className="max-w-[calc(100vw-58px)] flex-1 sm:max-w-[calc(100vw-256px)]">
                <header className="mb-8 flex flex-col items-center justify-between max-sm:gap-4 sm:flex-row">
                    <div>
                        <h1 className="text-3xl font-semibold">
                            {t("SUBSCRIPTIONS.title")}
                        </h1>
                        <p className="p-lead">
                            {t("SUBSCRIPTIONS.description")}
                        </p>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline">
                                <Bolt /> Recharge balance
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Recharge balance</DialogTitle>
                                <DialogDescription>
                                    Recharge your balance to buy courses
                                </DialogDescription>
                            </DialogHeader>
                            <Input
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                placeholder="Enter code"
                            />
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button
                                        onClick={() => handleTopUpWallet()}
                                        className="btn-primary"
                                    >
                                        Apply code
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </header>
                <aside className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    <Card className="flex flex-col gap-2 rounded-xl border p-6 py-12">
                        <span>
                            <span className="font-mono text-5xl font-semibold tracking-tighter">
                                {Number(userWallet?.balance).toFixed(1)}
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
                                0
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
                                    <TableHead
                                        className={
                                            locale === "ar"
                                                ? "text-right"
                                                : "text-left"
                                        }
                                    >
                                        ID
                                    </TableHead>
                                    <TableHead
                                        className={
                                            locale === "ar"
                                                ? "text-right"
                                                : "text-left"
                                        }
                                    >
                                        {t("SUBSCRIPTIONS.card5.table.head1")}
                                    </TableHead>
                                    <TableHead
                                        className={
                                            locale === "ar"
                                                ? "text-right"
                                                : "text-left"
                                        }
                                    >
                                        {t("SUBSCRIPTIONS.card5.table.head5")}
                                    </TableHead>
                                    <TableHead
                                        className={
                                            locale === "ar"
                                                ? "text-right"
                                                : "text-left"
                                        }
                                    >
                                        {t("SUBSCRIPTIONS.card5.table.head6")}
                                    </TableHead>
                                    <TableHead>Code</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {invoices.map((invoice) => (
                                    <TableRow key={invoice.id}>
                                        <TableCell>
                                            {invoice.payment_id}
                                        </TableCell>
                                        <TableCell className="py-4">
                                            {format(invoice.created_at)}
                                        </TableCell>
                                        <TableCell className="font-semibold">
                                            {Number(invoice?.amount)?.toFixed(
                                                2,
                                            )}{" "}
                                            {t("SUBSCRIPTIONS.currency")}
                                        </TableCell>
                                        <TableCell>
                                            <Tag
                                                color={
                                                    invoice?.is_used
                                                        ? "green"
                                                        : "red"
                                                }
                                            >
                                                {invoice?.is_used
                                                    ? "Active"
                                                    : "Inactive"}
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
                                                    toast(
                                                        "Copied to clipboard",
                                                        {
                                                            duration: 2000,
                                                            icon: (
                                                                <CircleCheck />
                                                            ),
                                                            position:
                                                                "top-center",
                                                        },
                                                    );
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
            </section>
        </>
    );
};

export default Subscriptions;
