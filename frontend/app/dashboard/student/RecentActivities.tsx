import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
    ChartConfig,
    ChartTooltip,
    ChartTooltipContent,
    ChartContainer,
} from "@/components/ui/chart";

const chartData = [
    {
        label: "January",
        value: 3,
    },
    {
        label: "February",
        value: 2,
    },
    {
        label: "March",
        value: 5,
    },
    {
        label: "April",
        value: 2,
    },
    {
        label: "May",
        value: 4,
    },
];

const chartConfig: ChartConfig = {
    value: {
        label: "Videos",
        color: "#8884d8",
    },
};

const RecentActivities = () => {
    return (
        <ChartContainer
            config={chartConfig}
            className="mt-6 min-h-[200px] w-full"
            title="Recent Activities"
        >
            <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="label"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                />
                <YAxis dataKey="value" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" fill="var(--color-secondary)" radius={4} />
            </BarChart>
        </ChartContainer>
    );
};

export default RecentActivities;
