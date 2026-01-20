import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/Blogify1.png"

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const { isLoggedIn, logout } = useAuth()

    const handleLogout = () => {
        logout()
        navigate("/login");
    };

    return (
        <header className="sticky top-0 z-50 bg-white shadow-md font-semibold">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

                <Link to="/">
                    <div className="flex gap-0.5">
                        <img
                            src={logo}
                            alt="Blogify Logo"
                            className="h-10 w-auto object-contain"
                        />
                        <span className="text-3xl font-bold">Blog
                            <span className="text-orange-500">ify</span>
                        </span>
                    </div>
                </Link>


                <nav className="hidden md:flex items-center justify-center gap-6">
                    <Link to="/" className="text-black hover:text-orange-500">Home</Link>
                    <Link to="/blogs" className="text-black hover:text-orange-500">Blogs</Link>

                    {isLoggedIn && (
                        <>
                            <Link
                                to="/create-blogs"
                                className="text-black hover:text-orange-500"
                            >
                                Create Blog
                            </Link>

                            <Link
                                to="/my-blogs"
                                className="text-black hover:text-orange-500"
                            >
                                My Blogs
                            </Link>
                        </>
                    )}
                </nav>


                <div className="hidden md:flex gap-3">
                    {!isLoggedIn ? (
                        <>
                            <Link
                                to="/login"
                                className="shadow-lg  text-center px-4 py-2 border rounded text-black hover:text-orange-500"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="shadow-lg  text-center px-4 py-2 border rounded text-black hover:text-orange-500"
                            >
                                Register
                            </Link>
                        </>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="shadow-lg hover:text-red-700 text-center w-30 px-4 py-2 border rounded text-red-500">
                            Logout
                        </button>
                    )}
                </div>

                <button onClick={() => setOpen(!open)} className="md:hidden text-2xl">
                    ☰
                </button>
            </div>

            {open && (
                <div className="md:hidden px-4 pb-4 flex flex-col space-y-3">
                    <Link to="/" className="shadow-lg hover:text-gray-700 text-center w-30 px-4 py-2 border rounded text-gray-500 active:scale-95">Home</Link>
                    <Link to="/blogs" className="shadow-lg hover:text-gray-700 text-center w-30 px-4 py-2 border rounded text-gray-500 active:scale-95">Blog</Link>

                    {isLoggedIn && (
                        <>
                            <Link
                                to="/create-blogs"
                                className="shadow-lg hover:text-gray-700 text-center w-30 px-4 py-2 border rounded text-gray-500 active:scale-95"
                            >
                                Create Blog
                            </Link>

                            <Link
                                to="/my-blogs"
                                className="shadow-lg hover:text-gray-700 text-center w-30 px-4 py-2 border rounded text-gray-500 active:scale-95"
                            >
                                My Blogs
                            </Link>
                        </>
                    )}

                    <hr />

                    {!isLoggedIn ? (
                        <>
                            <Link to="/login" className="shadow-lg hover:text-gray-700 text-center w-30 px-4 py-2 border rounded text-gray-500">Login</Link>
                            <Link to="/register" className="shadow-lg hover:text-gray-700 text-center w-30 px-4 py-2 border rounded text-gray-500">Register</Link>
                        </>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="shadow-lg hover:text-red-700 text-center w-30 px-4 py-2 border rounded text-red-500"
                        >
                            Logout
                        </button>
                    )}
                </div>
            )}
        </header>
    );
};

export default Navbar;
