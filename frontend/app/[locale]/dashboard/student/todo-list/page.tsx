import axios from "axios";
import TasksList from "./TasksList";

import { Suspense } from "react";
import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";

const TodoList = async () => {
    const cookiesStore = await cookies();
    const tasksId = JSON.parse(cookiesStore.get("user")?.value || "")?.tasks_id;
    const t = await getTranslations("STUDENT_DASHBOARD.TODO_LIST");

    const res = await axios.get(`http://localhost:8001/tasks/${tasksId}`);
    const tasks = res.data;

    return (
        <section>
            <header className="mb-8">
                <h1 className="text-3xl font-semibold">{t("title")}</h1>
            </header>
            <main className="rounded-2xl border p-6">
                <Suspense fallback={<div>{t("no_tasks")}</div>}>
                    <TasksList tasks={tasks.tasks} tasksId={tasks.id} />
                </Suspense>
            </main>
        </section>
    );
};

export default TodoList;
