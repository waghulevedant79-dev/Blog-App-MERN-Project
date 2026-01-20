import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            const res = await fetch("http://localhost:3000/api/blogs");
            const data = await res.json();
            setBlogs(Array.isArray(data) ? data : []);
            setLoading(false);
        };

        fetchBlogs();
    }, []);

    if (loading) return <p>Loading blogs...</p>;

    return blogs.length === 0 ? (
        <p>No blogs found</p>
    ) : (
        <div className="grid gap-6 p-4 md:grid-cols-3">
            {blogs.map(blog => (
                <div key={blog._id} className="bg-white p-6 shadow rounded">
                    <h2 className="text-xl text-gray-700 font-bold">{blog.title}</h2>
                    <p className="text-gray-500 py-3">{blog.content.slice(0, 120)}...</p>
                    <p className="text-sm text-gray-600 py-2">
                        By {blog.author?.name || 'Unknown'}
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
    );
};

export default BlogList;
