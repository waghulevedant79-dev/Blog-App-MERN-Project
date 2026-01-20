import React from 'react'
import { useNavigate } from 'react-router-dom'

const BackButton = () => {
    const navigate = useNavigate()
    return (
        <button
        onClick={ () => navigate(-1) }
        className='rounded-lg mb-4 w-19 h-11 font-semibold px-3 text-center inline-flex items-center gap-2 text-sm text-black active:scale-95 bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/50'
        >
            ← Back
        </button>
    )
}

export default BackButton
