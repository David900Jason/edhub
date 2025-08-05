import DashContainer from "@/components/containers/DashContainer";

const MySessions = () => {
    return (
        <DashContainer>
            <div className="flex-1">
                <div className="p-6">
                    <h1 className="mb-2 text-3xl font-bold">My Sessions</h1>
                    <p className="text-muted-foreground">
                        Here you can view and manage your sessions.
                    </p>
                </div>
            </div>
        </DashContainer>
    );
};

export default MySessions;
