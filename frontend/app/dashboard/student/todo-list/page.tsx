import axios from "axios";
import TasksList from "./TasksList";
import { Suspense } from "react";

const TodoList = async () => {
    const res = await axios.get(`http://localhost:8000/tasks/e3f9`);
    const tasks = res.data;

    return (
        <section>
            <header className="mb-8">
                <h1 className="text-3xl font-semibold">My Tasks</h1>
            </header>
            <main className="rounded-2xl border p-6">
                <Suspense fallback={<div>Loading...</div>}>
                    <TasksList tasks={tasks.tasks} tasksId={tasks.id} />
                </Suspense>
            </main>
        </section>
    );
};

export default TodoList;
