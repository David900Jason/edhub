import DashContainer from "@/components/containers/DashContainer";

const Exams = () => {
    return (
        <DashContainer>
            <div className="flex-1">
                <div className="p-6">
                    <h1 className="mb-2 text-3xl font-bold">Exams</h1>
                    <p className="text-muted-foreground">
                        Here you can view and manage your exams.
                    </p>
                </div>
            </div>
        </DashContainer>
    );
};

export default Exams;
