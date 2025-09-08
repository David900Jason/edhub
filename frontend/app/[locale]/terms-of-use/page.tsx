import Container from "@/components/containers/Container";
import Navbar from "@/components/layout/Navbar";

const TermsOfUse = () => {
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
                        شروط الاستخدام
                    </h1>
                    <p className="mb-4 text-gray-800">
                        استخدامك لمنصتنا التعليمية يعني موافقتك على الشروط
                        التالية.
                    </p>

                    <section className="mt-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
                        <h2 className="mb-2 text-lg font-bold">
                            1) التسجيل والحساب
                        </h2>
                        <ul className="list-disc space-y-2 pr-6">
                            <li>يجب أن يكون لكل مستخدم حساب خاص به.</li>
                            <li>
                                الطلاب والمعلمين مسؤولون عن الحفاظ على سرية
                                بيانات الدخول وكلمة المرور.
                            </li>
                            <li>لا يُسمح بمشاركة الحساب مع أشخاص آخرين.</li>
                        </ul>
                    </section>

                    <section className="mt-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
                        <h2 className="mb-2 text-lg font-bold">
                            2) استخدام المحتوى
                        </h2>
                        <ul className="list-disc space-y-2 pr-6">
                            <li>
                                جميع الكورسات والفيديوهات والمواد التعليمية
                                محمية بحقوق الملكية.
                            </li>
                            <li>
                                يمنع نسخ أو إعادة نشر المحتوى بدون إذن صريح من
                                المنصة أو المعلم.
                            </li>
                            <li>
                                يمكنك استخدام المحتوى لأغراض التعليم الشخصي فقط.
                            </li>
                        </ul>
                    </section>

                    <section className="mt-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
                        <h2 className="mb-2 text-lg font-bold">
                            3) التزامات الطلاب
                        </h2>
                        <ul className="list-disc space-y-2 pr-6">
                            <li>
                                الالتزام بالقوانين العامة والأخلاقيات أثناء
                                استخدام المنصة.
                            </li>
                            <li>
                                عدم نشر أي محتوى مسيء أو تحريضي في المنتديات أو
                                التعليقات.
                            </li>
                            <li>احترام حقوق المعلمين والزملاء في التعلم.</li>
                        </ul>
                    </section>

                    <section className="mt-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
                        <h2 className="mb-2 text-lg font-bold">
                            4) التزامات المعلمين
                        </h2>
                        <ul className="list-disc space-y-2 pr-6">
                            <li>تقديم محتوى أصلي وعدم انتهاك حقوق الغير.</li>
                            <li>
                                الالتزام بمعايير الجودة في الدروس والاختبارات.
                            </li>
                            <li>
                                متابعة تفاعلات الطلاب والرد على الأسئلة بطريقة
                                محترمة.
                            </li>
                        </ul>
                    </section>

                    <section className="mt-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
                        <h2 className="mb-2 text-lg font-bold">
                            5) المدفوعات والاشتراكات
                        </h2>
                        <ul className="list-disc space-y-2 pr-6">
                            <li>
                                الاشتراكات غير قابلة للتحويل بين المستخدمين.
                            </li>
                            <li>يتم تحصيل المدفوعات من خلال وسائل دفع آمنة.</li>
                            <li>
                                المنصة قد تحتفظ بالحق في تعديل الأسعار أو
                                السياسات، مع إشعار المستخدمين مسبقًا.
                            </li>
                        </ul>
                    </section>

                    <section className="mt-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
                        <h2 className="mb-2 text-lg font-bold">6) المسؤولية</h2>
                        <ul className="list-disc space-y-2 pr-6">
                            <li>
                                المنصة ليست مسؤولة عن أي ضرر ناتج عن سوء استخدام
                                المحتوى.
                            </li>
                            <li>
                                المحتوى التعليمي مقدم لأغراض تعليمية ولا يُعتبر
                                استشارة رسمية.
                            </li>
                        </ul>
                    </section>

                    <section className="mt-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
                        <h2 className="mb-2 text-lg font-bold">
                            7) التعديلات على الشروط
                        </h2>
                        <p className="text-gray-800">
                            قد نحدّث الشروط من وقت لآخر. أي تغييرات جوهرية سيتم
                            إعلام المستخدمين عبر البريد الإلكتروني أو إشعار داخل
                            المنصة.
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

export default TermsOfUse;
