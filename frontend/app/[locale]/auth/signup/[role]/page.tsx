"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/routing";
import FormHeader from "@/components/auth/FormHeader";
import PhoneDetails from "../_components/PhoneDetails";
import AdditionalDetails from "../_components/AdditionalDetails";
import PersonalDetails from "../_components/PersonalDetails";
import { ArrowLeft, ArrowRight, Loader2, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signUpUser } from "@/lib/api/auth";
import { cn, omit, parseDateOnly } from "@/lib/utils";
import { toast } from "sonner";
import { useParams } from "next/navigation";

export default function Signup() {
    const t = useTranslations("AUTH_FORMS");
    const [step, setStep] = useState(1);
    const [date, setDate] = useState<string | null>(null);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        watch,
        formState: { isSubmitting, errors, isValid },
    } = useForm<SignupFormType>();
    const params = useParams();
    const role = params.role === "instructor" ? "teacher" : params.role;

    const onSubmit: SubmitHandler<SignupFormType> = async (data) => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        if (!isValid) return;

        try {
            const res = await signUpUser({
                ...omit(data, ["confirm_password"]),
                birth_date: parseDateOnly(date || ""),
                role: role as string,
            });

            if (res.id) {
                toast.success("User created successfully");
                router.push("/auth/login");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <FormHeader
                title={t("SIGN_UP.title")}
                description={t("SIGN_UP.description")}
            />
            {/* Sign Up Form */}
            <form
                method="post"
                className="register-form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="mb-4 flex w-full gap-2">
                    <Button
                        type="button"
                        size="lg"
                        disabled={step === 1}
                        variant="outline"
                        className="flex-1/2"
                        onClick={() => setStep(step - 1)}
                    >
                        <ArrowLeft /> Prev
                    </Button>
                    {step < 3 && (
                        <Button
                            type="button"
                            size="lg"
                            variant="outline"
                            className="flex-1/2"
                            onClick={() => setStep(step + 1)}
                        >
                            Next <ArrowRight />
                        </Button>
                    )}
                </div>
                {step === 1 && (
                    <PersonalDetails
                        register={register}
                        errors={errors}
                        watch={watch}
                    />
                )}
                {step === 2 && (
                    <PhoneDetails
                        register={register}
                        errors={errors}
                        watch={watch}
                        role={role as string}
                    />
                )}
                {step === 3 && (
                    <AdditionalDetails
                        register={register}
                        date={date}
                        setDate={setDate}
                    />
                )}
                {step === 3 && (
                    <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className={cn(
                            "btn-primary",
                            isSubmitting && "btn-loading",
                        )}
                    >
                        {isSubmitting ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <>
                                <PlusCircle /> {t("SIGN_UP.btn")}
                            </>
                        )}
                    </Button>
                )}
                {/* Don't have an account? */}
                <p className="text-center text-sm text-gray-600">
                    {t("SIGN_UP.have_account")}{" "}
                    <Link href="/auth/login" className="text-primary">
                        {t("SIGN_UP.sign_in")}
                    </Link>
                </p>
            </form>
        </>
    );
}
