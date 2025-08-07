"use client";

import FormHeader from "@/components/auth/FormHeader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { sendMessage } from "@/lib/api";

interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

const Contact = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isSubmitting },
    } = useForm<ContactFormData>();

    const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
        try {
            // Handle success
            if (!isValid) {
                return;
            }

            alert("Message sent successfully!");
            sendMessage({
                ...data,
                created_at: new Date().toISOString(),
            });
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Failed to send message. Please try again.");
        }
    };

    return (
        <>
            <FormHeader
                title="Contact Us"
                description="Have questions? Send us a message and we'll get back to you soon."
            />
            <form onSubmit={handleSubmit(onSubmit)} className="register-form">
                <div className="input-group">
                    <Label className="mb-2" htmlFor="name">
                        Name
                    </Label>
                    <Input
                        id="name"
                        name="name"
                        placeholder="Enter your name"
                    />
                </div>

                <div className="input-group">
                    <Label className="mb-2" htmlFor="email">
                        Email
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email format",
                            },
                        })}
                    />
                    {errors.email && (
                        <p className="text-destructive text-sm">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <div className="input-group">
                    <Label className="mb-2" htmlFor="message">
                        Message
                    </Label>
                    <Textarea
                        id="message"
                        className="min-h-[150px]"
                        {...register("message", {
                            required: "Message is required",
                            minLength: {
                                value: 10,
                                message:
                                    "Message must be at least 10 characters",
                            },
                        })}
                        placeholder="Enter your message"
                    />
                    {errors.message ? (
                        <p className="text-destructive text-sm">
                            {errors.message.message}
                        </p>
                    ) : (
                        <p className="text-muted-foreground text-sm">
                            Your message will be sent to our team.
                        </p>
                    )}
                </div>

                <Button
                    type="submit"
                    className="w-full text-white"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        "Send Message"
                    )}
                </Button>
            </form>
        </>
    );
};

export default Contact;
