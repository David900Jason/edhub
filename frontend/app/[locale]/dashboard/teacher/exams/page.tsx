import { Button } from "@/components/ui/button";
import ExamsList from "./_components/exams-list";
import { Plus } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function ExamsPage() {
    const t = useTranslations("TEACHER_DASHBOARD.EXAMS");

    return (
        <section>
            <header className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between sm:gap-0">
                <div className="text-center sm:text-left">
                    <h1 className="text-3xl text-start font-semibold">{t("title")}</h1>
                    <p className="p-lead">{t("description")}</p>
                </div>
                <Button asChild className="btn-primary">
                    <Link href="/dashboard/teacher/exams/new">
                        <Plus className="h-4 w-4" />
                        {t("cta1")}
                    </Link>
                </Button>
            </header>
            <main>
                <ExamsList />
            </main>
        </section>
    );
}
