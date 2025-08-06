import { Card, CardContent } from "@/components/ui/card";
import { List, User } from "lucide-react";
import DashContainer from "@/components/containers/DashContainer";
import ProgressCircle from "@/components/sublayout/ProgressCircle";
import RecentActivities from "@/components/sublayout/RecentActivites";
import { Checkbox } from "@/components/ui/checkbox";
import {
    dashboardHomeCards,
    dummyTasksData,
    recentActivitiesData,
} from "@/constants";
import { cn } from "@/lib/utils";
import DashboardCard from "@/components/cards/DashboardCard";

const Dashboard = () => {
    return (
        <DashContainer>
            <div className="flex-4/5 border-r">
                <div className="p-6">
                    <h1 className="mb-4 py-4 pt-0 text-3xl font-extrabold">
                        Hello, Ahmed! 👋
                    </h1>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {dashboardHomeCards.map((card: any, index: number) => {
                            return (
                                <DashboardCard
                                    key={index}
                                    card={card}
                                />
                            );
                        })}
                    </div>
                </div>
                <hr />
                <div className="mb-10 grid grid-cols-1 gap-6 p-6 md:grid-cols-3">
                    <div className="col-span-1 rounded-lg border bg-white p-6 shadow md:col-span-2">
                        <h2 className="mb-1 text-2xl font-bold">
                            Recent Activities
                        </h2>
                        <p className="text-gray-400">
                            recently completed courses and sessions
                        </p>
                        <RecentActivities
                            chartConfig={{
                                courses: {
                                    label: "Courses",
                                    color: "#8884d8",
                                },
                                sessions: {
                                    label: "Sessions",
                                    color: "#82ca9d",
                                },
                            }}
                            chartData={recentActivitiesData}
                            axis={{ xAxis: "month", yAxis: "sessions" }}
                        />
                    </div>
                    {/* Progress Circle */}
                    <div className="col-span-1 flex flex-col rounded-lg border bg-white p-6 shadow">
                        <h2 className="mb-1 text-2xl font-bold">
                            Progress Circle
                        </h2>
                        <p className="text-gray-400">
                            Track your learning progress
                        </p>
                        {/* Simple Progress Circle */}
                        <div className="mt-4 flex flex-1 flex-col items-center justify-center">
                            <ProgressCircle
                                size={160}
                                progress={0.7}
                                color={"primary"}
                                strokeWidth={20}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </DashContainer>
    );
};

export default Dashboard;
