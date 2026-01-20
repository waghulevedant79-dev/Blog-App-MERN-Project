import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth()

    const navigate = useNavigate();

    const handleLogin = async (elem) => {
        elem.preventDefault();
        setLoading(true);

        try {
            const response = await api.post('/auth/login', {
                email, 
                password
            })

            login(response.data.token)
            navigate("/blogs");
        } catch (error) {
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className=" min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleLogin}
                className="bg-white p-8 rounded-xl shadow-md w-96 font-sans font-medium"
            >
                <h2 className=" text-2xl font-bold text-center text-black  mb-6">
                    Login
                </h2>

                <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-4 px-4 py-2 border rounded"
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-4 px-4 py-2 border rounded"
                    required
                />

                <button
                    className={`w-full py-2 text-white rounded font-bold transition ${loading
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-black hover:bg-orange-500"
                        }`}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
};

export default Login;
