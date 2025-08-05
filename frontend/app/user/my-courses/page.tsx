import DashContainer from "@/components/containers/DashContainer";

const MyCourses = () => {
    return (
        <DashContainer>
            <div className="flex-1">
                <div className="p-6">
                    <h1 className="mb-2 text-3xl font-bold">My Courses</h1>
                    <p className="text-muted-foreground">
                        Here you can view and manage your courses.
                    </p>
                </div>
            </div>
        </DashContainer>
    );
};

export default MyCourses;
