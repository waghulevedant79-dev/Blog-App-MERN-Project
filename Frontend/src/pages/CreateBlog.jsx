import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from "../api/axios"

const CreateBlog = () => {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await api.post("/blogs", {
                title,
                content,
            });

            navigate(`/blogs/${data._id}`);
        } catch (error) {
            console.error("Failed to create blog", error);
            alert("Failed to create blog");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className=' min-h-screen flex items-center justify-center bg-gray-100'>
            
            <form
                onSubmit={handleSubmit}
                className='bg-white p-8 rounded-xl shadow-md w-96 font-sans font-medium'
            >
                <h2 className=' text-2xl font-bold text-center mb-6'>Create Blog</h2>

                <input
                    type="text"
                    placeholder='Blog title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='w-full mb-4 px-4 py-2 border rounded'
                    required
                />

                <textarea
                    placeholder='Blog Content'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className='w-full mb-4 px-4 py-2 border rounded'
                    required
                />

                <button
                    disabled={loading}
                    className='w-full bg-gray-400 text-white py-2 rounded hover:bg-gray-500 font-bold active:scale-95'>
                    {loading ? "Creating..." : "Create Blog"}
                </button>
            </form>
        </div>
    )
}

export default CreateBlog
