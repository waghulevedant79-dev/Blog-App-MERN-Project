import { Link } from "react-router-dom";

const CTASection = () => {
    const isLoggedIn = Boolean(localStorage.getItem("token"));

    return (
        <section className="bg-orange-500 py-20 text-white">
            <div className="max-w-5xl mx-auto px-6 text-center">

                <h2 className="text-4xl font-bold mb-4">
                    Ready to share your ideas?
                </h2>

                <p className="text-lg mb-8 opacity-90">
                    Join Blogify and start writing blogs that people love to read.
                </p>

                {isLoggedIn ? (
                    <Link
                        to="/create-blogs"
                        className="inline-block bg-white text-orange-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition"
                    >
                        ✍️ Write your first blog
                    </Link>
                ) : (
                    <Link
                        to="/register"
                        className="inline-block bg-white text-orange-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition"
                    >
                        🚀 Get started for free
                    </Link>
                )}
            </div>
        </section>
    );
};

export default CTASection;