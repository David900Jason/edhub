import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";

const PhoneDetails = ({
    register,
    errors,
    watch,
    role,
}: {
    register: UseFormRegister<SignupFormType>;
    errors: FieldErrors<SignupFormType>;
    watch: UseFormWatch<SignupFormType>;
    role: string;
}) => {
    const t = useTranslations("AUTH_FORMS");
    const locale = useLocale();

    return (
        <>
            {/* Phone Input */}
            <div className="input-group">
                <Label className="mb-2" htmlFor="phone_number">
                    {t("SIGN_UP.PHONE_NUMBER.label")}
                </Label>
                <Input
                    {...register("phone_number", {
                        required: t("SIGN_UP.PHONE_NUMBER.req_msg"),
                        pattern: {
                            value: /^[0-9]{11}$/,
                            message: t("SIGN_UP.PHONE_NUMBER.pattern_msg"),
                        },
                        maxLength: {
                            value: 11,
                            message: t("SIGN_UP.PHONE_NUMBER.max_msg"),
                        },
                    })}
                    placeholder={t("SIGN_UP.PHONE_NUMBER.placeholder")}
                    type="tel"
                    dir={locale === "ar" ? "rtl" : "ltr"}
                />
                {errors.phone_number && (
                    <p className="input-error">
                        <AlertCircle className="inline h-4 w-4" />{" "}
                        {errors.phone_number.message}
                    </p>
                )}
            </div>
            {/* Parent Phone Input */}
            <div className="input-group">
                <Label className="mb-2" htmlFor="parent_number">
                    {role === "teacher"
                        ? "Other phone number"
                        : t("SIGN_UP.PARENT_PHONE_NUMBER.label")}
                </Label>
                <Input
                    {...register("parent_number", {
                        required:
                            watch("role") === "teacher"
                                ? false
                                : t("SIGN_UP.PARENT_PHONE_NUMBER.req_msg"),
                        pattern: {
                            value: /^[0-9]{11}$/,
                            message: t(
                                "SIGN_UP.PARENT_PHONE_NUMBER.pattern_msg",
                            ),
                        },
                        maxLength: {
                            value: 11,
                            message: t("SIGN_UP.PARENT_PHONE_NUMBER.max_msg"),
                        },
                    })}
                    placeholder={t("SIGN_UP.PARENT_PHONE_NUMBER.placeholder")}
                    type="tel"
                    dir={locale === "ar" ? "rtl" : "ltr"}
                />
                {errors.parent_number && (
                    <p className="input-error">
                        <AlertCircle className="inline h-4 w-4" />{" "}
                        {errors.parent_number.message}
                    </p>
                )}
            </div>
        </>
    );
};
export default PhoneDetails;
