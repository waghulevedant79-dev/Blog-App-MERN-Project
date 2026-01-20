import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import api from '../api/axios'
import BackButton from '../components/BackButton'
import { useAuth } from '../context/AuthContext'

const SingleBlog = () => {
    const { id } = useParams()
    const [blog, setBlog] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const { isLoggedIn } = useAuth()


    const token = localStorage.getItem('token')

    let isAuthor = false
    if (token && blog?.author?._id) {
        try {
            const decoded = JSON.parse(atob(token.split(".")[1]));
            isAuthor = decoded.id === blog.author._id;
        } catch {
            isAuthor = false;
        }
    }

    const handleDelete = async () => {
        if (!window.confirm('Delete this blog?')) return

        try {
            await api.delete(`/blogs/${blog._id}`)
            alert('Blog deleted')
            navigate('/blogs')
        } catch {
            alert('Something went wrong')
        }
    }


    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const { data } = await api.get(`/blogs/${id}`)
                setBlog(data)
            } catch (error) {
                console.error("Failed to fetch blog", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    if (loading) {
        return (
            <p className='text-center mt-20 text-gray-600'>
                Loading blogs...
            </p>
        )
    }

    if (error) {
        return (
            <p className="text-center mt-20 text-red-500">
                {error}
            </p>
        );
    }

    if (!blog) {
        return <p className='text-center mt-10'>No blog found</p>
    }

    const PREVIEW_LENGTH = 350
    const visibleContent = blog.content.slice(0, PREVIEW_LENGTH)
    const hiddenContent = blog.content.slice(PREVIEW_LENGTH)

    return (
        <div className="flex flex-col gap-4 rounded-2xl max-w-full p-10 ">

            <BackButton />

            <h1 className="text-4xl font-bold mb-4 text-gray-700">
                {blog.title}
            </h1>

            {isAuthor && (
                <div className='flex gap-3 mb-6'>
                    <button
                        onClick={() => navigate(`/blogs/edit/${blog._id}`)}
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded active:scale-95"
                    >
                        Edit
                    </button>

                    <button
                        onClick={handleDelete}
                        className='px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded active:scale-95'
                    >
                        Delete
                    </button>
                </div>
            )}

            <p className='text-sm text-gray-500 mb-6'>
                By {blog.author?.name || "Unknown"}
            </p>

            <hr />

            <div className='text-gray-700 text-lg'>
                <p>{visibleContent}</p>

                {!isLoggedIn && hiddenContent && (
                    <div className="relative mt-4">
                        <div className="blur-sm select-none pointer-events-none text-gray-600">
                            {hiddenContent}
                        </div>

                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-white/90 backdrop-blur p-6 rounded shadow text-center">
                                <p className="text-gray-700 mb-3">
                                    🔒 Login to read the full blog
                                </p>

                                <Link
                                    to='/login'
                                    className='inline-block px-4 py-2 bg-gray-800 text-white rounded'
                                >
                                    Login
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                {isLoggedIn && (
                    <p className='whitespace-pre-line mt-4 '>
                        {hiddenContent}
                    </p>
                )}
            </div>
        </div>
    );
}

export default SingleBlog
