import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";

type optionProps = {
    label: string;
    value: string;
};

interface SelectElementProps {
    placeholder: string;
    options: optionProps[];
    label?: string;
    name?: string;
    required?: boolean
    onChange?: (value: string) => void
}

const SelectElement = ({
    placeholder,
    options,
    label,
    name,
    required = false,
    onChange,
}: SelectElementProps) => {
    return (
        <div className="input-group">
            <Label className="mb-2" htmlFor={name}>{label}{required && <span className="text-red-500">*</span>}</Label>
            <Select name={name} onValueChange={onChange}>
                <SelectTrigger>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {options.map((option: optionProps) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
};

export default SelectElement;
