import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from "../api/axios"
import BackButton from '../components/BackButton';

const MyBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyBlogs = async () => {
            try {
                const { data } = await api.get("/blogs/my");
                setBlogs(data);
            } catch (error) {
                console.error("Failed to fetch my blogs", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMyBlogs();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure?");
        if (!confirmDelete) return;

        try {
            await api.delete(`/blogs/${id}`);
            setBlogs((prev) => prev.filter((blog) => blog._id !== id));
        } catch (error) {
            console.error("Delete failed", error);
            alert("Failed to delete blog");
        }
    };

    if (loading) {
        return <p className="text-center mt-10">Loading...</p>;
    }

    if (blogs.length === 0) {
        return <p className="text-center mt-10">You have no blogs yet.</p>;
    }

    return (
        <div className="flex flex-col gap-4 max-w-full mx-auto p-10 ">
            <BackButton />
            <h1 className="text-3xl font-bold mb-6">My Blogs</h1>

            <div className="space-y-6">
                {blogs.map((blog) => (
                    <div
                        key={blog._id}
                        className="p-3 rounded shadow flex justify-between items-center h-35"
                    >
                        <div>
                            <h2 className="text-xl font-semibold py-2">{blog.title}</h2>
                            <p className="text-gray-600 line-clamp-2">
                                {blog.content}
                            </p>
                        </div>

                        <div className="flex font-semibold gap-3">
                            <Link
                                to={`/blogs/${blog._id}`}
                                className="text-center w-15 p-2 text-blue-500 border rounded hover:text-blue-700 active:scale-95"
                            >
                                View
                            </Link>

                            <Link
                                to={`/blogs/edit/${blog._id}`}
                                className="text-center w-15 p-2 text-green-500 border rounded hover:text-green-700 active:scale-95"
                            >
                                Edit
                            </Link>

                            <button
                                onClick={() => handleDelete(blog._id)}
                                className="text-center w-18 p-2 text-red-500 border rounded hover:text-red-700 active:scale-95"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyBlogs;
