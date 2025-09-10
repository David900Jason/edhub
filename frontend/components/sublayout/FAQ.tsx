import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Container from "../containers/Container";
import { ChevronDown, CircleQuestionMark } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const FAQ = () => {
    return (
        <Container className="space-y-12">
            <div className="space-y-2">
                <SingleQuestion
                    question="كلمني أكتر عن منصة Edhub?"
                    answer="منصة Edhub هي منصة تهدف لتوفير بواية للتعلم وأكثر من ذلك من خلال توفير بيئة كاملة للطلبة والمدرسين و تطوير محتوى متنوع وشامل."
                />
                <SingleQuestion
                    question="ممكن أعرف النظام بيمشي ازاي عندكم في المنصة؟"
                    answer="المنصة معمولة بنظام سهل خالص عشان يسهل على المدرسين تجربة إدارة المحتوى للطلبة من خلال اننا بنخلي المدرس يعمل حساب على المنصة ينزل عليه المحتوى واحنا بنتولى الباقي من اول المونتاج لحد التسويق وجمع الطلبة."
                />
                <SingleQuestion
                    question="ممكن أعرف معلومات عن الباقات الشهرية والسنوية؟"
                    answer="للمزيد من المعلومات يرجى التوجه الى صفحة الاسعار"
                />
                <SingleQuestion
                    question="أعمل ايه عشان اقدر اسجل معاكم؟"
                    answer="سجل على المنصة عندنا كمدرس.
ونحب نفكر حضرتك ان فيه فترة تجريبية عشان ضمان جودة الخدمة قبل احتساب الاشتراك والفترة ده لمدة 14 يوم من تاريخ التسجيل."
                />
                <SingleQuestion
                    question="مين يقدر يسجل معاكم كمدرس؟"
                    answer=" المنصة عندنا بتسمح لكل المعلمين وبتديهم الفرصة عشان يبنوا محتواهم أونلاين لكل الناس بدون شروط أو اقتصار على فئة معينة."
                />
            </div>
            <div dir="rtl" className="p-6 space-y-6">
                <h3 className="text-lg font-bold">
                    هل لديك المزيد من الأسئلة؟
                </h3>
                <p className="text-lg text-muted-foreground max-w-[65ch]">
                    إذا كانت لديك أي أسئلة أخرى، فلا تتردد في الاتصال بنا. نحن
                    هنا لمساعدتك في أي استفسارات أو استفسارات أخرى.
                </p>
                <Button asChild className="btn-primary">
                    <Link href="/contact">اتصل بنا</Link>
                </Button>
            </div>
        </Container>
    );
};

const SingleQuestion = ({
    question,
    answer,
}: {
    question: string;
    answer: string;
}) => {
    const [open, setOpen] = useState(false);

    return (
        <Collapsible onOpenChange={setOpen} className="w-full px-6 py-4">
            <CollapsibleTrigger dir="rtl" className="flex w-full items-center justify-between gap-2 rounded-lg border-b pb-5 text-lg font-bold">
                <div className="flex items-center gap-2">
                    <CircleQuestionMark /> {question}
                </div>
                <ChevronDown
                    className={cn(
                        open ? "rotate-180 transition" : "transition",
                        "h-7 w-7",
                        "text-primary font-bold",
                    )}
                />
            </CollapsibleTrigger>
            <CollapsibleContent dir="rtl" className="ms-2 mt-4 min-h-[125px] rounded-lg">
                <p>{answer}</p>
            </CollapsibleContent>
        </Collapsible>
    );
};

export default FAQ;
