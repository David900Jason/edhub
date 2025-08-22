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
        value: 1500,
    },
    {
        label: "February",
        value: 2000,
    },
    {
        label: "March",
        value: 5000,
    },
    {
        label: "April",
        value: 2000,
    },
    {
        label: "May",
        value: 4000,
    },
];

const chartConfig: ChartConfig = {
    value: {
        label: "Revenue",
        color: "#8884d8",
    },
};

const AverageRevenue = () => {
    return (
        <ChartContainer
            config={chartConfig}
            className="mt-6 min-h-[200px] w-full"
            title="Average Revenue"
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

export default AverageRevenue;
