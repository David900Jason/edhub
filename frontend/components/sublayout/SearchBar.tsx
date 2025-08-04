"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
    onSearch: (query: string) => void;
    placeholder?: string;
    className?: string;
    value?: string;
}

const SearchBar = ({
    onSearch,
    placeholder = "Search...",
    className = "",
    value = "",
}: SearchBarProps) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const searchQuery = formData.get("search") as string;
        onSearch(searchQuery);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit} className={`w-full ${className}`}>
            <div className="relative">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                    type="search"
                    name="search"
                    placeholder={placeholder}
                    className="w-full py-6 pr-4 pl-10 text-base"
                    value={value}
                    onChange={handleChange}
                />
            </div>
        </form>
    );
};

export default SearchBar;
