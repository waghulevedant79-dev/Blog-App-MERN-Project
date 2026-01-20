import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-100">
            <div className="max-w-7xl mx-auto px-6 py-10">


                <div className="flex flex-col md:flex-row justify-between gap-8">


                    <div>
                        <span className="text-3xl font-bold">Blog
                        <span className="text-orange-500">ify</span>
                        </span>
                        <p className="text-gray-600 mt-2 max-w-sm">
                            A modern blogging platform to share ideas, stories, and knowledge.
                        </p>
                    </div>


                    <div className="flex gap-12">
                        <div>
                            <h4 className="font-semibold text-gray-500 mb-3">Explore</h4>
                            <ul className="space-y-2">
                                <li><Link to="/" className="text-black hover:text-orange-500">Home</Link></li>
                                <li><Link to="/blogs" className="text-black hover:text-orange-500">Blogs</Link></li>
                                <li><Link to="/my-blogs" className="text-black hover:text-orange-500">My Blogs</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold  text-gray-500 mb-3">Account</h4>
                            <ul className="space-y-2 text-gray-600">
                                <li><Link to="/login" className="text-black hover:text-orange-500">Login</Link></li>
                                <li><Link to="/register" className="text-black hover:text-orange-500">Register</Link></li>
                                <li><Link to="/create-blogs" className="text-black hover:text-orange-500">Write</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <hr className="my-8 border-gray-300" />


                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-600 text-sm">
                    <p>© {new Date().getFullYear()} Blogify. All rights reserved.</p>

                    <div className="flex gap-4">
                        <a href="#" className="text-black hover:text-orange-500">Twitter</a>
                        <a href="#" className="text-black hover:text-orange-500">GitHub</a>
                        <a href="#" className="text-black hover:text-orange-500">LinkedIn</a>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;