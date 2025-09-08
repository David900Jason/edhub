"use client";

import Container from "@/components/containers/Container";
import SearchBar from "@/components/sublayout/SearchBar";
import TeacherCard from "./TeacherCard";
import { useState } from "react";

const TeachersGrid = ({ data }: { data: UserType[] }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredData = data.filter((teacher) => {
        return teacher.full_name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
    });

    return (
        <section className="mx-auto mt-16 mb-24 max-w-4xl p-6">
            {/* Search Bar */}
            <Container className="space-y-6 !p-0 min-h-[80vh]">
                <SearchBar
                    value={searchQuery}
                    onSearch={(e) => setSearchQuery(e)}
                    placeholder="Search teachers..."
                />
                {filteredData.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:grid-cols-3">
                        {filteredData.map((teacher, idx) => {
                            return <TeacherCard key={idx} teacher={teacher} />;
                        })}
                    </div>
                ) : (
                    <p className="text-center text-sm font-normal text-gray-400">
                        No Teachers Found
                    </p>
                )}
            </Container>
        </section>
    );
};

export default TeachersGrid;
