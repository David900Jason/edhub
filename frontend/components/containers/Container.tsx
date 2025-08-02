import { cn } from "@/lib/utils";

const Container = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div
            className={cn(
                "mx-auto max-w-7xl px-4 py-6 md:px-12 lg:px-24",
                className,
            )}
        >
            {children}
        </div>
    );
};

export default Container;
