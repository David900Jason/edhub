const Course = ({ params }: { params: { id: string } }) => {
    const { id } = params;
    return (
        <div>
            <h1 className="text-4xl font-bold">Course {id}</h1>
        </div>
    );
};

export default Course;
