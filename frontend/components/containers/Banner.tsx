import { cn } from "@/lib/utils";

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
                "from-primary to-primary-foreground min-h-[40vh] bg-gradient-to-b",
                className,
            )}
        >
            {children}
        </section>
    );
};

export default Banner;
