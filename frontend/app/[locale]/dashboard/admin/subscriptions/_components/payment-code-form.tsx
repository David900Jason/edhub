"use client";

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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { createPaymentRecord } from "@/lib/api/user";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

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

const PaymentCodeForm = ({ userWallets }: { userWallets: UserWallet[] }) => {
    const [data, setData] = useState({
        code: "",
        amount: 0,
        wallet: "",
    });

    const users = [
        ...new Set(
            userWallets.map((wallet: UserWallet) => {
                return {
                    id: wallet.id,
                    name: wallet.student.full_name,
                };
            }),
        ),
    ];

    function generatePaymentCode(length = 8): string {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const array = new Uint32Array(length);
        crypto.getRandomValues(array);
        return Array.from(array, (x) => chars[x % chars.length]).join("");
    }

    const handleCreatePaymentRecord = () => {
        if (!data.code || !data.amount || !data.wallet) return;
        createPaymentRecord(data);
        toast.success("Payment record created successfully");
        window.location.reload();
    };

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">
                        <Plus /> Create code
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Payment Record</DialogTitle>
                        <DialogDescription>
                            Add a new payment record
                        </DialogDescription>
                    </DialogHeader>
                    <Input
                        placeholder="Code"
                        value={data.code}
                        onChange={(e) =>
                            setData({ ...data, code: e.target.value })
                        }
                        type="text"
                    />
                    <span
                        onClick={() => {
                            setData({ ...data, code: generatePaymentCode() });
                        }}
                        className="ms-2 mt-[-10px] block cursor-pointer text-xs text-gray-500 hover:underline"
                    >
                        Generate Code
                    </span>
                    <Input
                        placeholder="Amount"
                        value={data.amount}
                        onChange={(e) =>
                            setData({ ...data, amount: Number(e.target.value) })
                        }
                        type="number"
                    />
                    <Select
                        onValueChange={(value) =>
                            setData({ ...data, wallet: value })
                        }
                        value={data.wallet}
                    >
                        <SelectTrigger>
                            <SelectValue
                                placeholder="Select a student name"
                            />
                        </SelectTrigger>
                        <SelectContent>
                            {users.map(({ name, id }) => (
                                <SelectItem key={id} value={id}>
                                    {name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button onClick={() => handleCreatePaymentRecord()} className="btn-primary">
                                Add Payment Record
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default PaymentCodeForm;
