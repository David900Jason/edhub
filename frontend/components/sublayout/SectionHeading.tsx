const SectionHeading = ({ title }: { title: string }) => {
    return (
        <div className="mb-12">
            <h1 className="text-center text-4xl sm:text-5xl font-bold">{title}</h1>
        </div>
    );
};

export default SectionHeading;
