import DashContainer from "@/components/containers/DashContainer";
import EnrolledSessionCard from "@/components/cards/EnrolledSessionCard";
import { fetchEnrollments, fetchSession } from "@/lib/api";

const MySessions = async () => {
    const enrollments = await fetchEnrollments();
    const sessions = enrollments.filter((enrollment: any) => {
        // Has course_id
        return enrollment.session_id !== undefined;
    });

    // Loop over the courses and fetch each course in on single array
    let sessionArray = await Promise.all(
        sessions.map(async (session: any) => {
            const sessionData = await fetchSession(session.session_id);
            return sessionData;
        }),
    );
    sessionArray = sessionArray.flat();
    console.log(sessionArray);

    return (
        <DashContainer>
            <div className="flex-1">
                <div className="grid grid-cols-2 gap-4 p-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {sessionArray.map((session: any) => (
                        <EnrolledSessionCard
                            key={session.id}
                            session={session}
                        />
                    ))}
                </div>
            </div>
        </DashContainer>
    );
};

export default MySessions;
