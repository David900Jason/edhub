import { Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import {
    ChartConfig,
    ChartTooltip,
    ChartTooltipContent,
    ChartContainer,
} from "@/components/ui/chart";

// Sample data for monthly average scores
const monthlyAverages = [
    {
        month: "January",
        averageScore: 85.75,
    },
    {
        month: "February",
        averageScore: 50.0,
    },
    {
        month: "March",
        averageScore: 75.5,
    },
    {
        month: "April",
        averageScore: 100,
    },
    {
        month: "May",
        averageScore: 83.75,
    },
];

const chartData = monthlyAverages;

const chartConfig: ChartConfig = {
    value: {
        label: "Average Score",
        color: "#8884d8",
    },
};

const StudentsLineChart = () => {
    return (
        <ChartContainer
            config={chartConfig}
            className="mt-6 min-h-[300px] w-full"
            title="Students' Exam Performance"
        >
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={10}
                    />
                    <YAxis
                        domain={[0, 100]}
                        tickLine={false}
                        axisLine={false}
                        tickMargin={10}
                        tickFormatter={(value) => `${value}%`}
                    />
                    <ChartTooltip 
                        content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                                return (
                                    <div className="rounded-lg border bg-background p-4 shadow-sm">
                                        <p className="font-medium">{payload[0].payload.month}</p>
                                        <p className="text-sm text-muted-foreground">
                                            Average Score: {payload[0].value}%
                                        </p>
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />
                    <Line
                        type="monotone"
                        dataKey="averageScore"
                        name="Average Score"
                        stroke="#8884d8"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
};

export default StudentsLineChart;