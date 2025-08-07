import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// components/layout/FilterSelect.tsx
interface FilterSelectProps {
    placeholder: string;
    options: string[];
    value: string;
    onValueChange: (value: string) => void;
}

const FilterSelect = ({
    placeholder,
    options,
    value,
    onValueChange,
}: FilterSelectProps) => {
    return (
        <Select value={value} onValueChange={onValueChange}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {options.map((option) => (
                    <SelectItem key={option} value={option}>
                        {option}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default FilterSelect;
