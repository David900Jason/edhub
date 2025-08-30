import { cn } from "@/lib/utils";

const Tag = ({
    children,
    color,
}: {
    children: React.ReactNode;
    color: string;
}) => {
    // Color changing logic
    const colors = {
        purple: "bg-purple-300 text-primary border-primary",
        blue: "bg-blue-200 text-blue-600 border-blue-400",
        green: "bg-green-200 text-green-600 border-green-400",
        yellow: "bg-yellow-200 text-yellow-600 border-yellow-400",
        red: "bg-red-200 text-red-600 border-red-400",
    };

    const selectedColor = colors[color as keyof typeof colors];

    return (
        <span
            className={cn(
                "rounded-full border px-2 py-[2px] text-xs",
                selectedColor,
            )}
        >
            {children}
        </span>
    );
};

export default Tag;
