"use client";

import { useEffect, useState } from "react";
import SectionHeading from "./SectionHeading";
import TestimonialCard from "../cards/TestimonialCard";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const TESTIMONIAL_KEYS = [
    "STUDENT_1",
    "STUDENT_2",
    "STUDENT_3",
    "STUDENT_4",
    "STUDENT_5",
    "STUDENT_6",
];

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const t = useTranslations("HOME");

    // Cycle through testimonials every 3 seconds
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % TESTIMONIAL_KEYS.length);
        }, 3000);
        return () => clearInterval(intervalId);
    }, [setCurrentIndex]);

    const currentStudent = TESTIMONIAL_KEYS[currentIndex];

    return (
        <section className="py-16" id="testimonials">
            <div className="container mx-auto px-4">
                <SectionHeading title={t("TESTIMONIALS.title")} />
                <div className="mx-auto flex flex-col gap-8">
                    <div className="flex flex-2/3 items-center justify-center">
                        <TestimonialCard 
                            studentKey={currentStudent} 
                        />
                    </div>
                    <div className="bullets flex items-center justify-center gap-2">
                        {TESTIMONIAL_KEYS.map((student, index) => (
                            <button
                                key={student}
                                onClick={() => setCurrentIndex(index)}
                                className={cn(
                                    "aspect-square w-4 cursor-pointer rounded-full transition-all",
                                    index === currentIndex 
                                        ? "w-6 bg-primary" 
                                        : "bg-slate-300 hover:bg-slate-400"
                                )}
                                aria-label={`View testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
