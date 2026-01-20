import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import api from "../../api/axios";

const FeaturedBlogs = () => {
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const { data } = await api.get("/blogs");
                setBlogs(data.slice(0, 3)); // show only 3 on home
            } catch (error) {
                console.error("Failed to fetch blogs", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [])

    if (loading) {
        return (
            <p className="text-center py-20 text-gray-500">
                Loading blogs...
            </p>
        );
    }
    return (
        <section className=" py-20">
            <div className="max-w-7xl mx-auto px-6">

                {/* HEADER */}
                <div className="text-center mb-14">
                    <h2 className="text-4xl font-bold text-gray-900">
                        Latest from the community
                    </h2>
                    <p className="mt-4 text-gray-600">
                        Read what people are writing on Blogify
                    </p>
                </div>

                {/* BLOG CARDS */}
                <div className="grid gap-8 md:grid-cols-3">
                    {blogs.map((blog) => (
                        <div
                            key={blog._id}
                            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
                        >
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                {blog.title}
                            </h3>

                            <p className="text-sm text-gray-500 mb-3">
                                By {blog.author?.name || "Unknown"}
                            </p>

                            <p className="text-gray-600 mb-4 line-clamp-3">
                                {blog.content}
                            </p>

                            <Link
                                to={`/blogs/${blog._id}`}
                                className="text-orange-500 font-medium hover:underline"
                            >
                                Read more →
                            </Link>
                        </div>
                    ))}
                </div>

                {/* VIEW ALL */}
                <div className="text-center mt-14">
                    <Link
                        to="/blogs"
                        className="inline-block px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                    >
                        View all blogs
                    </Link>
                </div>

            </div>
        </section>
    )
}

export default FeaturedBlogs
