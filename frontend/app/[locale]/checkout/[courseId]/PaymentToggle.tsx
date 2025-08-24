"use client";

import { useRouter } from "@/i18n/routing";
import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const PaymnetToggle = ({ course }: { course: CourseType }) => {
    const [paymentMethod, setPaymentMethod] = useState("digital wallet");
    const [user] = useLocalStorage("user_profile", null);
    const router = useRouter();

    return (
        <>
            <div className="flex items-center justify-between">
                <h3 className="flex-1/2 text-lg font-medium">
                    Payment Method:
                </h3>
                <p className="flex-1/2 text-end text-lg text-gray-500">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="capitalize" variant="outline">
                                {paymentMethod}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuRadioGroup
                                value={paymentMethod}
                                onValueChange={setPaymentMethod}
                            >
                                <DropdownMenuRadioItem value="digital wallet">
                                    Digital Wallet
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="visa card">
                                    Visa Card
                                </DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </p>
            </div>
            <hr className="mt-6" />
            {/* {paymentMethod === "digital wallet" && (
                <div className="flex items-center justify-center p-4">
                    <Button
                        className="bg-secondary ml-2 w-56"
                        variant="outline"
                        onClick={() => {}}
                    >
                        <ShoppingBag className="h-4 w-4" />
                        Pay Now
                    </Button>
                </div>
            )} */}
            {/* {paymentMethod === "visa card" && (
                <div className="flex items-center justify-center p-4">
                    <p className="text-gray-500">Coming soon...</p>
                </div>
            )} */}
            <div className="flex items-center justify-center p-4">
                <p className="text-gray-500">Coming soon...</p>
            </div>
        </>
    );
};

export default PaymnetToggle;
