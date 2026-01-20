
const ValueSection = () => {
    return (
        <section className="py-15">
            <div className="max-w-7xl mx-auto px-6">
                <>
                    <div className="text-center mb-14">
                        <h2 className="text-4xl font-bold text-gray-900">
                            Why choose <span className="text-orange-500">Blogify</span> ?
                        </h2>
                        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                            A clean, distraction-free blogging platform built for creators,
                            developers, and storytellers.
                        </p>
                    </div>
                </>
                <>
                    <div className="grid gap-8 md:grid-cols-3">

                        {/* 1 */}
                        <div className="p-8 rounded-2xl border hover:shadow-lg transition">
                            <div className="text-4xl mb-4">✍️</div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                Write without distractions
                            </h3>
                            <p className="text-gray-600">
                                Focus on writing meaningful content with a clean and minimal editor experience.
                            </p>
                        </div>

                        {/* 2 */}
                        <div className="p-8 rounded-2xl border hover:shadow-lg transition">
                            <div className="text-4xl mb-4">🚀</div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                Built with MERN stack
                            </h3>
                            <p className="text-gray-600">
                                Modern architecture using MongoDB, Express, React, and Node.js — fast and scalable.
                            </p>
                        </div>

                        {/* 3 */}
                        <div className="p-8 rounded-2xl border hover:shadow-lg transition">
                            <div className="text-4xl mb-4">🔐</div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                Secure & private
                            </h3>
                            <p className="text-gray-600">
                                JWT-based authentication ensures your content stays safe and under your control.
                            </p>
                        </div>
                    </div>
                </>
            </div>
        </section>
    )
}

export default ValueSection
