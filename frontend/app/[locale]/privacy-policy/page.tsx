import Container from "@/components/containers/Container";
import Navbar from "@/components/layout/Navbar";

const PrivacyPolicy = () => {
    return (
        <>
            <header className="header-fixed">
                <Navbar />
            </header>
            <Container className="my-12">
                <div
                    dir="rtl"
                    lang="ar"
                    className="mx-auto my-10 max-w-3xl rounded-2xl bg-white p-6 leading-relaxed"
                >
                    <h1 className="mb-4 text-2xl font-extrabold">
                        سياسة الخصوصية
                    </h1>
                    <p className="mb-4 text-gray-800">
                        إحنا في منصتنا التعليمية مهتمين جدًا نحافظ على خصوصية كل
                        المستخدمين سواء طلاب أو معلمين. لما تستخدم المنصة، ده
                        معناه إنك موافق على السياسة دي.
                    </p>

                    <section className="mt-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
                        <h2 className="mb-2 text-lg font-bold">
                            1&#93; البيانات اللي بنجمعها
                        </h2>
                        <ul className="list-disc space-y-2 pr-6">
                            <li>
                                <strong>للطالب:</strong> بنسجل اسمك، إيميلك،
                                ورقم موبايلك (لو لزم). كمان بنسجل الكورسات اللي
                                اشتركت فيها وتقدّمك فيها.
                            </li>
                            <li>
                                <strong>للمعلم:</strong> بنسجل بياناتك الأساسية
                                (اسمك، إيميلك، رقم الحساب البنكي أو وسيلة الدفع)
                                عشان نقدر نعرض كورساتك ونوصلك أرباحك.
                            </li>
                            <li>
                                <strong>للكل:</strong> بعض البيانات العامة زي
                                الصفحات اللي زرتها أو الوقت اللي قضيته على
                                المنصة، عشان نحسّن الخدمة.
                            </li>
                        </ul>
                    </section>

                    <section className="mt-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
                        <h2 className="mb-2 text-lg font-bold">
                            2&#93; ليه بنستخدم بياناتك
                        </h2>
                        <ul className="list-disc space-y-2 pr-6">
                            <li>نسهّل دخولك للكورسات والمواد التعليمية.</li>
                            <li>نتابع مستوى تقدّمك أو تقدّم طلابك.</li>
                            <li>نوصل الأرباح للمعلمين بشكل منظم وآمن.</li>
                            <li>نبعت إشعارات عن تحديثات الكورسات أو المنصة.</li>
                        </ul>
                    </section>

                    <section className="mt-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
                        <h2 className="mb-2 text-lg font-bold">
                            3&#93; حماية البيانات
                        </h2>
                        <p className="text-gray-800">
                            بياناتك محفوظة عندنا باستخدام أنظمة أمان حديثة، ومش
                            بنسمح لغير المصرّح لهم يشوفوها.
                        </p>
                    </section>

                    <section className="mt-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
                        <h2 className="mb-2 text-lg font-bold">
                            4&#93; مشاركة البيانات
                        </h2>
                        <ul className="list-disc space-y-2 pr-6">
                            <li>
                                مش بنبيع بياناتك أو نشاركها مع أي جهة خارجية.
                            </li>
                            <li>
                                الاستثناء: طلب قانوني رسمي، أو شركات الدفع
                                لإتمام الاشتراكات والتحويلات.
                            </li>
                        </ul>
                    </section>

                    <section className="mt-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
                        <h2 className="mb-2 text-lg font-bold">
                            5&#93; حقوقك
                        </h2>
                        <ul className="list-disc space-y-2 pr-6">
                            <li>من حقك تعرف إيه البيانات اللي عندنا.</li>
                            <li>تقدر تطلب تعديل أو حذف بياناتك في أي وقت.</li>
                            <li>
                                تقدر توقف استلام الرسائل الدعائية من خلال اختيار
                                «إلغاء الاشتراك».
                            </li>
                        </ul>
                    </section>

                    <section className="mt-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
                        <h2 className="mb-2 text-lg font-bold">
                            6&#93; التحديثات
                        </h2>
                        <p className="text-gray-800">
                            لو حدّثنا السياسة دي هنبلّغك بإشعار داخل المنصة أو
                            بالإيميل.
                        </p>
                    </section>

                    <p className="mt-6 text-xs text-gray-500">
                        آخر تحديث:{" "}
                        {new Date().toLocaleDateString("ar-EG", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </p>
                </div>
            </Container>
        </>
    );
};

export default PrivacyPolicy;
