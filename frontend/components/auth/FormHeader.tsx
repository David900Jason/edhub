const FormHeader = ({
    title,
    description,
}: {
    title: string;
    description: string;
}) => {
    return (
        <div className="bg-primary sticky top-0 left-0 hidden h-screen flex-1/2 flex-col items-center justify-center gap-4 lg:flex lg:flex-1/2">
            <h1 className="text-4xl font-bold tracking-tighter text-gray-900">
                {title}
            </h1>
            <p className="p-lead max-w-[35ch] text-center !text-white">
                {description}
            </p>
        </div>
    );
};

export default FormHeader;
