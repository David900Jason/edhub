import { Book, GraduationCap, User } from "lucide-react";
import Container from "../containers/Container";

const Features = () => {
    return (
        <Container className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-6 py-12 text-center text-black shadow-xl backdrop-blur-lg transition-transform duration-300 hover:scale-105">
                <GraduationCap
                    size={64}
                    className="text-secondary mx-auto mb-6"
                />
                <h3 className="mb-2 text-xl font-bold">
                    Personalized Learning
                </h3>
                <p className="mx-auto max-w-[45ch] text-base">
                    Content tailored to every student’s learning pace.
                </p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-6 py-12 text-center text-black shadow-xl backdrop-blur-lg transition-transform duration-300 hover:scale-105">
                <Book size={64} className="text-secondary mx-auto mb-6" />
                <h3 className="mb-2 text-xl font-bold">
                    Interactive & Practical
                </h3>
                <p className="mx-auto max-w-[45ch] text-base">
                    Turn passive study into an active, engaging journey.
                </p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-6 py-12 text-center text-black shadow-xl backdrop-blur-lg transition-transform duration-300 hover:scale-105">
                <User size={64} className="text-secondary mx-auto mb-6" />
                <h3 className="mb-2 text-xl font-bold">Expert Teachers</h3>
                <p className="mx-auto max-w-[45ch] text-base">
                    Passionate mentors who simplify learning.
                </p>
            </div>
        </Container>
    );
};

export default Features;
