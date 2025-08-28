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
                "bg-gradient-colourful dark:text-black",
                className,
            )}
        >
            {children}
        </section>
    );
};

export default Banner;
