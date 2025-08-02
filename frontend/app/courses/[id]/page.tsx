import Banner from "@/components/containers/Banner";
import Container from "@/components/containers/Container";
import Tag from "@/components/ui/Tag";
import { format } from "timeago.js";
import {
    Book,
    BookUser,
    Film,
    Fullscreen,
    Lock,
    Medal,
    Video,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
    fetchCourse,
    fetchBooks,
    fetchExams,
    fetchSessions,
    fetchVideos,
} from "@/lib/api";
import { cn } from "@/lib/utils";

const Course = async ({ params }: { params: { id: string } }) => {
    const { id } = await params;

    const locked = true;

    const course = await fetchCourse(Number(id));
    const sessions = await fetchSessions(Number(id));
    const videos = await fetchVideos(Number(id));
    const books = await fetchBooks(Number(id));
    const exams = await fetchExams(Number(id));

    if (!course) {
        return <div>Course not found</div>;
    }

    return (
        <>
            <main>
                <Banner className="py-6">
                    <Container className="flex flex-col justify-center gap-6">
                        <ul className="flex items-center gap-2">
                            <li className="text-lg font-medium">
                                <Tag color="purple">
                                    {course[0]?.schoolYear}
                                </Tag>
                            </li>
                            <li className="text-lg font-medium">
                                <Tag color="blue">{course[0]?.subject}</Tag>
                            </li>
                            <li className="text-lg font-medium">
                                <Tag color="green">
                                    {course[0]?.isFinished
                                        ? "Finished"
                                        : "Not Finished"}
                                </Tag>
                            </li>
                        </ul>
                        <div className="flex flex-col gap-4 text-white">
                            <h1 className="flex items-center text-5xl font-bold tracking-tighter text-black">
                                {course[0]?.title || "Course not found"}{" "}
                            </h1>
                            <div className="flex items-center gap-1">
                                <p className="text-lg font-medium">
                                    {course[0]?.sessions ||
                                        "Course sessions not found"}{" "}
                                    sessions
                                </p>
                                <span className="text-white">•</span>
                                <p className="text-lg font-medium">
                                    {format(course[0]?.createdAt) || "Unknown"}
                                </p>
                            </div>
                            <p className="p-lead !text-white">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Odit, eum sit. Soluta numquam
                                eius sequi voluptatem quam magni harum nisi
                                saepe vitae enim eos beatae sapiente dolore
                                ratione, modi aliquid aspernatur voluptate
                                similique temporibus autem minus at expedita
                                nemo. Dolore nihil similique ipsa suscipit
                                excepturi, laborum laudantium fugiat placeat
                                beatae nulla quidem blanditiis odit sit optio
                                exercitationem sed iure voluptatem!
                            </p>
                        </div>
                    </Container>
                </Banner>
            </main>
            <section className="pt-16">
                <Container className="py-8">
                    {/* Sessions Title */}
                    <h2 className="mb-6 text-3xl font-bold tracking-tighter text-black">
                        <Fullscreen className="text-primary inline h-10 w-10" />{" "}
                        Sessions
                    </h2>
                    {/* Sessions Grid with Horizontal Scroll */}
                    <ScrollArea className="w-full">
                        <div className="flex space-x-8 pb-4">
                            {(sessions.length > 0 &&
                                sessions?.map((session: any) => (
                                    <div
                                        key={session.id}
                                        className="w-80 flex-shrink-0"
                                    >
                                        <Card className="h-full">
                                            <CardHeader className="gap-0">
                                                <CardTitle className="line-clamp-1 text-lg">
                                                    {session.title}
                                                </CardTitle>
                                                <CardDescription className="flex items-center gap-1">
                                                    {format(
                                                        session.start_time,
                                                    ) || "Unknown"}
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="p-lead line-clamp-3">
                                                    {session.description}
                                                </p>
                                            </CardContent>
                                            <CardFooter>
                                                <Button
                                                    variant="outline"
                                                    className="w-full"
                                                >
                                                    <Video className="mr-2 h-4 w-4" />
                                                    Watch Session
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    </div>
                                ))) || (
                                <p className="p-lead">No sessions found</p>
                            )}
                        </div>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                </Container>
            </section>
            <section>
                <Container className="py-8">
                    {/* Videos Title */}
                    <h2 className="mb-6 text-3xl font-bold tracking-tighter text-black">
                        <Film className="text-primary inline h-10 w-10" />{" "}
                        Videos
                    </h2>
                    {/* Videos Grid with Horizontal Scroll */}
                    <div className="grid grid-cols-1 gap-6 min-[630px]:grid-cols-2 md:grid-cols-3">
                        {(videos.length > 0 &&
                            videos?.map((video: any) => (
                                <Card
                                    key={video.id}
                                    className="flex items-center justify-center gap-0 p-8 pt-6"
                                >
                                    <Link
                                        href={`/courses/${id}/video/${video.id}`}
                                    >
                                        <Video className="h-24 w-24 transition-all hover:scale-110" />
                                    </Link>
                                    <p className="font-medium">{video.title}</p>
                                </Card>
                            ))) || <p className="p-lead">No videos found</p>}
                    </div>
                </Container>
            </section>
            <section>
                <Container className="py-8">
                    {/* Tests Title */}
                    <h2 className="mb-6 text-3xl font-bold tracking-tighter text-black">
                        <BookUser className="text-primary inline h-10 w-10" />{" "}
                        PDFs
                    </h2>
                    {/* Tests Grid with Horizontal Scroll */}
                    <div className="grid grid-cols-1 gap-4 min-[630px]:grid-cols-2 md:grid-cols-3">
                        {(books.length > 0 &&
                            books?.map((book: any) => (
                                <Card
                                    key={book.id}
                                    className="flex items-center justify-center gap-4 pb-8"
                                >
                                    <Link
                                        href={`/courses/${id}/book/${book.id}`}
                                    >
                                        <Book className="h-24 w-24 transition-all hover:scale-110" />
                                    </Link>
                                    <p className="font-medium">{book.title}</p>
                                </Card>
                            ))) || <p className="p-lead">No books found</p>}
                    </div>
                </Container>
            </section>
            {/* Exams */}
            <section>
                <Container className="py-8 pb-24">
                    {/* Exams Title */}
                    <h2 className="mb-6 text-3xl font-bold tracking-tighter text-black">
                        <BookUser className="text-primary inline h-10 w-10" />{" "}
                        Exams
                    </h2>
                    {/* Exams Grid with Horizontal Scroll */}
                    <div className="grid grid-cols-1 gap-4 min-[630px]:grid-cols-2 md:grid-cols-3">
                        {(exams.length > 0 &&
                            exams?.map((exam: any) => (
                                <Card
                                    key={exam.id}
                                    className="flex items-center justify-center gap-4 pb-8"
                                >
                                    <Link
                                        href={`/courses/${id}/exam/${exam.id}`}
                                    >
                                        <Medal className="h-24 w-24 transition-all hover:scale-110" />
                                    </Link>
                                    <p className="font-medium">{exam.title}</p>
                                </Card>
                            ))) || <p className="p-lead">No exams found</p>}
                    </div>
                </Container>
            </section>
        </>
    );
};

export default Course;
