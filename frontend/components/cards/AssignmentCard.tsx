import { GraduationCap } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

const AssignmentCard = ({
    title,
    description,
}: {
    title: string;
    description: string;
}) => {
    return (
        <Card className="flex flex-row overflow-hidden p-0">
            <div className="bg-blue-200 flex-1/3 flex justify-content-center items-center">
                <GraduationCap className="text-blue-400 flex-1" size={80} />
            </div>
            <div className="flex-2/3 px-1 py-6">
                <h2 className="text-xl font-bold">{title}</h2>
                <p className="text-muted-foreground">{description}</p>
                <Button className="mt-6" variant="outline">
                    View Assignment
                </Button>
            </div>
        </Card>
    );
};

export default AssignmentCard;
