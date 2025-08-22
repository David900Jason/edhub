"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const Test = () => {

    const getAllCourses = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:8000/api/courses");
            const data = res.data;
            console.log(data);
        } catch (error: any) {
            console.error(error?.response?.data?.error);
        }
    }

    useEffect(() => {
        getAllCourses();
    }, []);

    return (
        <div className="m-4">
            Test
        </div>
    );
};

export default Test;
