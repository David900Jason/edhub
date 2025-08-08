"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";

function DatePicker({ date, setDate }: { date: Date | null; setDate: (date: Date | null) => void }) {
    const [open, setOpen] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Format date on the client side only
    const formatDate = (date: Date | null) => {
        if (!isClient) return "";
        return date?.toLocaleDateString();
    };

    return (
        <div className="input-group">
            <Label htmlFor="date" className="mb-2">
                Date of birth
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger className="w-full" asChild>
                    <Button
                        variant="outline"
                        id="date"
                        className="w-full justify-between font-normal text-gray-500"
                    >
                        {isClient && date ? formatDate(date) : "Select date"}
                        <ChevronDownIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="w-full overflow-hidden p-0"
                    align="start"
                >
                    <Calendar
                        mode="single"
                        selected={date ? date : undefined}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                            if (date) setDate(date);
                            setOpen(false);
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}

export default DatePicker;