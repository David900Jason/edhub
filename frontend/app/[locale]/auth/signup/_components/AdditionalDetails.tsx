import { Label } from "@/components/ui/label";
import DatePicker from "@/components/auth/DatePicker";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { UseFormRegister } from "react-hook-form";

const AdditionalDetails = ({ register, date, setDate }: { register: UseFormRegister<SignupFormType>; date: string | null; setDate: (date: string | null) => void }) => {
    const t = useTranslations("AUTH_FORMS");
    const cities = t.raw("SIGN_UP.CITY.cities") as string[]

    return (
        <>
            {/* Date of birth */}
            <DatePicker
                date={date ? new Date(date) : null}
                setDate={(date) => setDate(date?.toISOString() || null)}
            />
            {/* Select City */}
            <div className="input-group">
                <Label className="mb-2" htmlFor="city">
                    {t("SIGN_UP.CITY.label")}
                </Label>
                <Select
                    onValueChange={(value) => {
                        register("city").onChange({
                            target: {
                                name: "city",
                                value: value,
                            },
                        });
                    }}
                    {...register("city")}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue
                            placeholder={t("SIGN_UP.CITY.placeholder")}
                        />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {cities.map((city, index) => {
                                return (
                                    <SelectItem key={index} value={city}>
                                        {city}
                                    </SelectItem>
                                );
                            })}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </>
    );
};

export default AdditionalDetails;
