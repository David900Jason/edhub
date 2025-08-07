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

const PaymentDialog = ({ paymentItem }: { paymentItem: string }) => {
    const handlePayment = () => {
        window.alert("Payment done successfully !");
    };

    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button
                        variant="outline"
                        className="rounded-full"
                        type="button"
                    >
                        <ShoppingCart className="h-4 w-4" /> Buy {paymentItem}
                    </Button>
                </DialogTrigger>
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
                                <ShoppingCart size={20} /> Buy
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
