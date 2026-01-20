import React, { useEffect, useState } from 'react'
import BlogList from '../components/Bloglist'
import api from "../api/axios"

const Blogs = () => {
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const { data } = await api.get("/blogs");
                setBlogs(data);
            } catch (error) {
                console.error("Failed to fetch blogs", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) {
        return (
            <div className='text-center mt-20 text-gray-600'>
                Loading blogs...
            </div>
        )
    }
    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-8 text-black text-center">
                Latest Blogs
            </h1>
            <BlogList />
        </div>
    );

}

export default Blogs
