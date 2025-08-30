"use client";

import { Card } from "@/components/ui/card";
import { useEffect } from "react";
import { useState } from "react";
import {
    getUserTransactions,
    getUserWallet,
    updateWallet,
} from "@/lib/api/payments";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Bolt, CircleCheck, X } from "lucide-react";
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
import { getStudentEnrollments } from "@/lib/api/course";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SubscriptionsList from "./_components/SubscriptionsList";
import BillingHistory from "./_components/BillingHistory";

type WalletType = {
    id: string;
    balance: number;
    currency: string;
    created_at: string;
};

const Subscriptions = () => {
    const [data, setData] = useState<{ invoices: InvoiceType[]; wallet: WalletType | null; courses: EnrollmentType[] }>({
        invoices: [],
        wallet: null,
        courses: [],
    })
    const [code, setCode] = useState<string>("");

    useEffect(() => {
        const fetch = async () => {
            const [wallet, payments, courses] = await Promise.all([
                getUserWallet(),
                getUserTransactions(),
                getStudentEnrollments(),
            ]);
            setData({ wallet, invoices: payments, courses });
        };
        fetch();
    }, [setData]);

    const handleTopUpWallet = async () => {
        try {
            const response = await updateWallet(code);

            if (response) {
                toast.success("Code added to wallet successfully", {
                    duration: 2000,
                    icon: <CircleCheck />,
                    position: "top-center",
                });
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to add code to wallet", {
                duration: 2000,
                icon: <X />,
                position: "top-center",
            });
        }
    };

    const t = useTranslations("STUDENT_DASHBOARD");

    const averageCost = data.invoices.length == 0 ? 0 : Number(
        data.invoices.reduce(
            (total, invoice) => total + (Number(invoice.amount) || 0),
            0,
        ) / data.invoices.length,
    ).toFixed(1);

    const totalCost = Number(
        data.invoices.reduce(
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
                                {Number(data.wallet?.balance).toFixed(1)}
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
                                {data.courses.length ?? 0}
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
                <section className="mt-6">
                    <Tabs defaultValue="subscriptions">
                        <TabsList className="w-full">
                            <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
                            <TabsTrigger value="billing-history">Billing history</TabsTrigger>
                        </TabsList>
                        <TabsContent value="subscriptions">
                            <SubscriptionsList courses={data.courses} />
                        </TabsContent>
                        <TabsContent value="billing-history">
                            <BillingHistory invoices={data.invoices} />
                        </TabsContent>
                    </Tabs>
                </section>
            </section>
        </>
    );
};

export default Subscriptions;
