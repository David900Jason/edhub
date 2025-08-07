"use client";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

const PaymentDialog = ({
    children,
    paymentItem,
    courseId,
}: {
    children: React.ReactNode;
    paymentItem: string;
    courseId: number | undefined;
}) => {
    const handlePayment = () => {
        window.alert("Payment done successfully !");
    };

    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>{children}</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Buy this {paymentItem}</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to buy this {paymentItem}?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button
                                type="submit"
                                onClick={handlePayment}
                                variant="secondary"
                            >
                                <Link
                                    className="flex items-center gap-2"
                                    href={`/checkout/${courseId}`}
                                >
                                    <ShoppingCart size={20} /> Confirm payment
                                </Link>
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
};

export default PaymentDialog;
