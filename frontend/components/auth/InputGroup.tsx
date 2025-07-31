"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

const InputGroup = ({ label, name, type, placeholder, required = false }: InputGroupProps) => {
    // password input return
    if (type === "password") {
        const [showPassword, setShowPassword] = useState<boolean>(false);

        return (
            <div className="input-group relative">
                <Label className="mb-2" htmlFor={name}>{label}{required && <span className="text-red-500">*</span>}</Label>
                <Input
                    name={name}
                    placeholder={placeholder}
                    type={showPassword ? "text" : type}
                />
                <Button
                    variant="ghost"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-5.5 right-0 rounded-none border-s-[1px] border-s-gray-300 text-gray-500 hover:bg-transparent dark:bg-black cursor-pointer"
                >
                    {showPassword ? <EyeOff /> : <Eye />}
                </Button>
                {/* <p className="input-error">Error Occured</p> */}
            </div>
        );
    }

    return (
        <div className="input-group">
            <Label className="mb-2" htmlFor={name}>{label}{required && <span className="text-red-500">*</span>}</Label>
            <Input name={name} placeholder={placeholder} type={type} />
            {/* <p className="input-error">Error Occured</p> */}
        </div>
    );
};

export default InputGroup;
