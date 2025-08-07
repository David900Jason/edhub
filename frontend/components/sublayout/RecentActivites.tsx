"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "../ui/chart";

const RecentActivities = ({
    chartConfig,
    chartData,
    axis,
}: {
    chartConfig: ChartConfig;
    chartData: object[];
    axis?: {
        xAxis?: string;
        yAxis?: string;
    };
}) => {
    return (
        <ChartContainer
            config={chartConfig}
            className="mt-6 min-h-[200px] w-full"
            title="Recent Activities"
        >
            <BarChart width={400} height={200} data={chartData}>
                <CartesianGrid />
                <XAxis
                    dataKey={axis?.xAxis || "month"}
                />
                <YAxis
                    dataKey={axis?.yAxis || "sessions"}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                {Object.entries(chartConfig).map(([key, value]) => (
                    <Bar
                        key={key}
                        dataKey={key}
                        fill={value.color}
                        radius={4}
                    />
                ))}
            </BarChart>
        </ChartContainer>
    );
};

export default RecentActivities;
