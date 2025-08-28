import { useTranslations } from "next-intl";

const TeachersAssignmentPage = () => {
    const t = useTranslations("TEACHER_DASHBOARD.ASSIGNMENTS");

    return (
        <section>
            <header className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between sm:gap-0">
                <div className="text-center sm:text-left">
                    <h1 className="text-3xl font-semibold">{t("title")}</h1>
                    <p className="p-lead">{t("description")}</p>
                </div>
                {/* <Button disabled className="btn-primary">
                        <Plus className="h-4 w-4" />
                        {t("cta1")}
                </Button> */}
            </header>
            <main className="flex min-h-[40vh] items-center justify-center rounded-2xl border p-6">
                <p className="text-center">Assignments coming soon ...</p>
            </main>
        </section>
    );
};

export default TeachersAssignmentPage;
