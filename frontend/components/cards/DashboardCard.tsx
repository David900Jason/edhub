import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";

type CardProps = {
    title: string;
    description: string;
    icon: React.ElementType;
};

const DashboardCard = ({ card }: { card: CardProps }) => {
    const { title, description, icon } = card;
    const Icon: React.ElementType = icon;

    return (
        <Card className="gap-1">
            <CardHeader className="flex items-center justify-between">
                <CardTitle className="text-lg text-primary font-bold">{title}</CardTitle>
                <Icon className="text-primary" size={24} />
            </CardHeader>
            <CardContent>
                <p className="text-5xl font-extrabold">0</p>
            </CardContent>
            <CardFooter>
                <CardDescription className="text-sm">
                    {description}
                </CardDescription>
            </CardFooter>
        </Card>
    );
};

export default DashboardCard;
