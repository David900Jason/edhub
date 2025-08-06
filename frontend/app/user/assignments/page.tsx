import AssignmentCard from "@/components/cards/AssignmentCard";
import DashContainer from "@/components/containers/DashContainer";

const Assignments = () => {
    return (
        <DashContainer>
            <div className="flex-1">
                <div className="grid grid-cols-1 gap-10 p-10 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                    <AssignmentCard
                        title="Assignment 1"
                        description="Assignment 1 Description"
                    />
                    <AssignmentCard
                        title="Assignment 2"
                        description="Assignment 2 Description"
                    />
                    <AssignmentCard
                        title="Assignment 3"
                        description="Assignment 3 Description"
                    />
                    <AssignmentCard
                        title="Assignment 4"
                        description="Assignment 4 Description"
                    />
                    <AssignmentCard
                        title="Assignment 5"
                        description="Assignment 5 Description"
                    />
                    <AssignmentCard
                        title="Assignment 6"
                        description="Assignment 6 Description"
                    />
                    <AssignmentCard
                        title="Assignment 7"
                        description="Assignment 7 Description"
                    />
                    <AssignmentCard
                        title="Assignment 8"
                        description="Assignment 8 Description"
                    />
                    <AssignmentCard
                        title="Assignment 9"
                        description="Assignment 9 Description"
                    />
                </div>
            </div>
        </DashContainer>
    );
};

export default Assignments;
