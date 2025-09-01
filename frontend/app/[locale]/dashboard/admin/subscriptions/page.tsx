"use client";

import { Button } from "@/components/ui/button";
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
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Tag from "@/components/ui/Tag";
import {
    getPaymentRecords,
    getUserWallets,
    updateUserWallet,
} from "@/lib/api/user";
import { DollarSign, Edit, Wallet } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { format } from "timeago.js";
import PaymentCodeForm from "./_components/payment-code-form";

type UserWallet = {
    id: string;
    student: {
        full_name: string;
        phone_number: string;
        parent_number: string;
        profile_img: string;
    };
    balance: number;
    currency: string;
    created_at: string;
};

type PaymentRecord = {
    id: string;
    payment_id: string;
    user_wallet: {
        id: string;
        full_name: string;
    };
    code: string;
    amount: number;
    is_used: boolean;
    created_at: string;
};

const SubscriptionsPage = () => {
    const [userWallets, setUserWallets] = useState<UserWallet[]>([]);
    const [paymentRecords, setPaymentRecords] = useState<PaymentRecord[]>([]);
    const [status, setState] = useState("used");
    const [search, setSearch] = useState<string>("");
    const [searchPayment, setSearchPayment] = useState<string>("");
    const [editingBalance, setEditingBalance] = useState<number>(0);

    useEffect(() => {
        getUserWallets().then((res) => setUserWallets(res));
        getPaymentRecords().then((res) => setPaymentRecords(res));
    }, []);

    const filteredWallets = useMemo(() => {
        return userWallets.filter((wallet) => {
            if (search === "") return userWallets;

            return (
                wallet.student.phone_number
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                wallet.student.parent_number
                    .toLowerCase()
                    .includes(search.toLowerCase())
            );
        });
    }, [search, userWallets]);

    const filteredPaymentRecords = useMemo(() => {
        return paymentRecords.filter((record) => {
            const recordStatus = record.is_used ? "used" : "not-used";
            const matchesStatus = status === "all" || status === recordStatus;
            const matchesSearch =
                !searchPayment ||
                record.user_wallet.full_name
                    .toLowerCase()
                    .includes(searchPayment.toLowerCase());

            return matchesStatus && matchesSearch;
        });
    }, [searchPayment, paymentRecords, status]);

    const handleEditWallet = (id: string) => {
        updateUserWallet(id, editingBalance);
        setUserWallets((prev) =>
            prev.map((wallet) =>
                wallet.id === id
                    ? { ...wallet, balance: editingBalance }
                    : wallet,
            ),
        );
    };

    return (
        <section>
            <header className="mb-8">
                <h1 className="text-3xl font-semibold">Subscriptions</h1>
                <p className="p-lead">
                    Here&apos;s a table containing all subscriptions
                </p>
            </header>
            <main className="rounded-2xl border p-6">
                <Tabs defaultValue="wallets">
                    <TabsList className="mb-2 w-full">
                        <TabsTrigger value="wallets">
                            <Wallet /> Students Wallets
                        </TabsTrigger>
                        <TabsTrigger value="payment_records">
                            <DollarSign /> Payment Records
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="wallets">
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search Wallets by phone number ..."
                            className="my-4"
                        />
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="p-4">
                                        Student
                                    </TableHead>
                                    <TableHead className="p-4">
                                        Phone Number
                                    </TableHead>
                                    <TableHead className="p-4">
                                        Parent Number
                                    </TableHead>
                                    <TableHead className="p-4">
                                        Balance
                                    </TableHead>
                                    <TableHead className="p-4">
                                        Created At
                                    </TableHead>
                                    <TableHead className="p-4">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredWallets.map((wallet) => (
                                    <TableRow key={wallet.id}>
                                        <TableCell className="p-4">
                                            {wallet.student.full_name}
                                        </TableCell>
                                        <TableCell className="p-4">
                                            {wallet.student.phone_number}
                                        </TableCell>
                                        <TableCell className="p-4">
                                            {wallet.student.parent_number}
                                        </TableCell>
                                        <TableCell className="p-4 font-bold">
                                            {Number(wallet.balance).toFixed(2)}{" "}
                                            <span className="text-primary text-xs">
                                                {wallet.currency}
                                            </span>
                                        </TableCell>
                                        <TableCell className="p-4 text-xs text-gray-500">
                                            {format(wallet.created_at)}
                                        </TableCell>
                                        <TableCell className="p-4">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="outline">
                                                        <Edit />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>
                                                            Edit Wallet
                                                        </DialogTitle>
                                                        <DialogDescription>
                                                            Edit the wallet
                                                            balance
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <Input
                                                        defaultValue={
                                                            wallet.balance
                                                        }
                                                        onChange={(e) =>
                                                            setEditingBalance(
                                                                Number(
                                                                    e.target
                                                                        .value,
                                                                ),
                                                            )
                                                        }
                                                        type="number"
                                                    />
                                                    <DialogFooter>
                                                        <DialogClose asChild>
                                                            <Button variant="outline">
                                                                Cancel
                                                            </Button>
                                                        </DialogClose>
                                                        <DialogClose asChild>
                                                            <Button
                                                                onClick={() =>
                                                                    handleEditWallet(
                                                                        wallet.id,
                                                                    )
                                                                }
                                                                className="btn-primary"
                                                            >
                                                                Save changes
                                                            </Button>
                                                        </DialogClose>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableCaption className="mb-4">
                                <p>
                                    {filteredWallets.length > 0 ? (
                                        <span>
                                            {filteredWallets.length} wallets
                                        </span>
                                    ) : (
                                        "No wallets found"
                                    )}
                                </p>
                            </TableCaption>
                        </Table>
                    </TabsContent>
                    <TabsContent value="payment_records">
                        <div className="my-4 flex flex-col md:flex-row items-center gap-2">
                            <Input
                                value={searchPayment}
                                onChange={(e) =>
                                    setSearchPayment(e.target.value)
                                }
                                placeholder="Search payment records..."
                            />
                            <div className="flex items-center gap-2">
                                <Select
                                    value={status}
                                    onValueChange={(value) => setState(value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            <Tag color="blue">All</Tag>
                                        </SelectItem>
                                        <SelectItem value="used">
                                            <Tag color="green">Used</Tag>
                                        </SelectItem>
                                        <SelectItem value="not-used">
                                            <Tag color="red">Not Used</Tag>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <PaymentCodeForm userWallets={userWallets} />
                            </div>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="p-4">Code</TableHead>
                                    <TableHead className="p-4">
                                        Student
                                    </TableHead>
                                    <TableHead className="p-4">
                                        Amount
                                    </TableHead>
                                    <TableHead className="p-4">Used</TableHead>
                                    <TableHead className="p-4">
                                        Created At
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredPaymentRecords.map((record, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="p-4 font-bold">
                                            <span
                                                style={{
                                                    fontFamily: "monospace",
                                                }}
                                            >
                                                {record.code}
                                            </span>
                                        </TableCell>
                                        <TableCell className="p-4">
                                            {record?.user_wallet?.full_name}
                                        </TableCell>
                                        <TableCell className="p-4">
                                            {Number(record.amount).toFixed(2)}
                                        </TableCell>
                                        <TableCell className="p-4">
                                            <Tag
                                                color={
                                                    record.is_used
                                                        ? "green"
                                                        : "red"
                                                }
                                            >
                                                {record.is_used
                                                    ? "Used"
                                                    : "Not Used"}
                                            </Tag>
                                        </TableCell>
                                        <TableCell className="p-4 text-xs text-gray-500">
                                            {format(record.created_at)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableCaption className="mb-4">
                                <p>
                                    {filteredPaymentRecords.length > 0 ? (
                                        <span>
                                            {filteredPaymentRecords.length}{" "}
                                            payment records
                                        </span>
                                    ) : (
                                        "No payment records found"
                                    )}
                                </p>
                            </TableCaption>
                        </Table>
                    </TabsContent>
                </Tabs>
            </main>
        </section>
    );
};

export default SubscriptionsPage;
