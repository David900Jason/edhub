import { cn } from "@/lib/utils";

// components/containers/Banner.tsx
const Banner = ({
    children,
    className,
}: {
    children?: React.ReactNode;
    className?: string;
}) => {
    return (
        <section
            className={cn(
                "from-primary to-primary-foreground min-h-[50vh] bg-gradient-to-b",
                className,
            )}
        >
            {children}
        </section>
    );
};

export default Banner;
