import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

    const handleRegister = async (elem) => {
        elem.preventDefault()
        setLoading(true)

        try {
            const response = await api.post('/auth/register', {
                name,
                email,
                password
            })
            
            alert(response.data.message || "Registration succesfull")
            navigate('/login')
        } catch (error) {
            console.log(error);
            alert('Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className=' min-h-screen flex items-center justify-center bg-gray-100'>
            <form
                onSubmit={handleRegister}
                className='bg-white p-8 rounded-xl shadow-md w-96 font-sans font-medium'
            >
                <h2 className=' text-2xl font-bold text-center text-gray-600 mb-6'>Register</h2>

                <input
                    type="name"
                    placeholder='Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='w-full mb-4 px-4 py-2 border rounded'
                    required
                />
                <input
                    type="email"
                    placeholder='Email address'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='w-full mb-4 px-4 py-2 border rounded'
                    required
                />

                <input
                    type="password"
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='w-full mb-4 px-4 py-2 border rounded'
                    required
                />

                <button
                    disabled={loading}
                    className='w-full bg-gray-400 text-white py-2 rounded hover:bg-gray-500 font-bold active:scale-95'>
                    {loading ? 'Creating account...' : 'Register'}
                </button>
            </form>
        </div>
    )
}

export default Register
