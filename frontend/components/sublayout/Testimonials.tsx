"use client";

import { useEffect, useState } from "react";

import SectionHeading from "./SectionHeading";
import TestimonialCard from "../cards/TestimonialCard";

import { reviews } from "@/constants";
import { cn, getRandomValue } from "@/lib/utils";

const Testimonials = () => {
    const [testimonial, setTestimonial] = useState(reviews[0]);

    // Randomly choose a testimonial every 1000ms
    useEffect(() => {
        const intervalId = setInterval(() => {
            const randomIndex = getRandomValue(reviews.length);
            setTestimonial(reviews[randomIndex]);
        }, 3000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            <SectionHeading title="Reviews" />
            <div className="mx-auto flex flex-col gap-8 px-16">
                {/* Testimonial Card */}
                <div className="flex flex-2/3 items-center justify-center">
                    <TestimonialCard review={testimonial} />
                </div>
                <div className="bullets flex items-center justify-center gap-2">
                    {reviews.map((review, index) => (
                        <div
                            key={index}
                            onClick={() => setTestimonial(review)}
                            className={cn(
                                "flex items-center justify-center aspect-square w-6 rounded-full border-1 cursor-pointer hover:bg-primary-foreground",
                                review.name === testimonial.name
                                    ? "bg-primary border-0"
                                    : "border-slate-400",
                            )}
                        ></div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Testimonials;
