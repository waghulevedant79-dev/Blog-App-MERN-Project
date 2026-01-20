import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../api/axios'
import BackButton from '../components/BackButton'


const EditBlog = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const { data } = await api.get(`/blogs/${id}`);
                setTitle(data.title);
                setContent(data.content);
            } catch (error) {
                console.error("Failed to fetch blog", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);


    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            await api.put(`/blogs/${id}`, {
                title,
                content,
            });

            navigate(`/blogs/${id}`);
        } catch (error) {
            console.error("Failed to update blog", error);
            alert("Update failed");
        }
    };

    if (loading) {
        return <p className="text-center mt-10">Loading...</p>
    }

    return (
        <div className='p-10 flex flex-col items-start justify-start w-7xl'>
            <BackButton />
            <form
                onSubmit={handleUpdate}
                className="bg-white w-362 p-8 rounded-xl shadow-lg"
            >

                <h2 className='text-2xl font-bold mb-6 text-black text-center'>
                    Edit Blog
                </h2>

                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='w-full mb-4 px-4 py-2 border rounded'
                    required
                />

                <textarea
                    rows="8"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full mb-4 px-4 py-2 border rounded"
                    required
                />

                <button
                    className="font-semibold w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Update Blog
                </button>
            </form>
        </div>
    )
}

export default EditBlog
