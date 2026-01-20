import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'

const HeroSection = () => {

    const { isLoggedIn } = useAuth()

    return (
        <section className='pt-10'>
            <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">

                <div>
                    <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
                        Write. Publish. <br />
                        <span className="text-orange-500">Inspire the Web.</span>
                    </h1>

                    <p className="mt-6 text-lg text-gray-600 max-w-xl">
                        Blogify is a modern blogging platform where developers and creators share ideas, experiences, and knowledge with the world.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4">
                        <Link
                            to="/blogs"
                            className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
                        >
                            Explore Blogs
                        </Link>

                        {!isLoggedIn && (
                            <Link
                                to="/register"
                                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                            >
                                Start Writing
                            </Link>
                        )}

                        {isLoggedIn && (
                            <Link
                                to="/create-blogs"
                                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                            >
                                Create Blog
                            </Link>
                        )}
                    </div>
                </div>

                <div className="hidden md:block w-145">
                    <div className="bg-white shadow-xl rounded-2xl p-6 border">
                        <p className="text-sm text-gray-500 mb-2">Featured snippet</p>
                        <h3 className="text-xl font-bold text-gray-800">
                            How I Built My First MERN App 🚀
                        </h3>
                        <p className="mt-3 text-gray-600 line-clamp-3">
                            Building a MERN stack project taught me authentication, routing,
                            state management, and real-world debugging skills...
                        </p>
                        <p className="mt-4 text-sm text-gray-400">— By Vedant</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
