import EnrolledCourseCard from "@/components/cards/EnrolledCourseCard";
import DashContainer from "@/components/containers/DashContainer";

import { fetchEnrollments, fetchCourse } from "@/lib/api";

const MyCourses = async () => {
    const enrollments = await fetchEnrollments();
    const courses = enrollments.filter((enrollment: any) => {
        // Has course_id
        return enrollment.course_id !== undefined;
    });

    // Loop over the courses and fetch each course in on single array
    let courseArray = await Promise.all(
        courses.map(async (course: any) => {
            const courseData = await fetchCourse(course.course_id);
            return courseData;
        }),
    );
    courseArray = courseArray.flat();
    console.log(courseArray);

    return (
        <DashContainer>
            <div className="flex-1">
                <div className="grid grid-cols-2 gap-8 p-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {courseArray.map((course: any) => (
                        <EnrolledCourseCard key={course.id} course={course} />
                    ))}
                </div>
            </div>
        </DashContainer>
    );
};

export default MyCourses;
