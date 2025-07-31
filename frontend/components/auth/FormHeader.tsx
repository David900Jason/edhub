const FormHeader = ({
    title,
    description,
}: {
    title: string;
    description: string;
}) => {
    return (
        <div className="bg-primary h-screen sticky top-0 left-0 flex flex-1/2 flex-col items-center justify-center gap-4">
            <h1 className="text-4xl tracking-tighter font-bold text-gray-900">{title}</h1>
            <p className="p-lead max-w-[35ch] text-center !text-white">{description}</p>
        </div>
    );
};

export default FormHeader;
