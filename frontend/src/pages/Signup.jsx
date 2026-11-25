import { useState } from 'react';
import dp from '../assets/user_dp.jpg'
import { useNavigate } from 'react-router-dom'
import axios from '../config/axiosConfig'

const SignUp = () => {
    const navigate = useNavigate();

    const initialState = {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: ""
    }

    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    return (
        <div className="min-h-screen w-full bg-[#ECFDF5] flex items-center justify-center p-4 sm:p-6 md:p-8">
            <div className="w-full max-w-md sm:max-w-125 bg-[#FFFFFF] rounded-2xl shadow-sm flex items-center justify-center flex-col gap-6 py-8 px-6 sm:py-10 sm:px-10">
                <h1 className="text-[#064E3B] font-bold text-2xl sm:text-3xl text-center">Sign Up</h1>

                <form onSubmit={async (e) => {
                    e.preventDefault();
                    setFormData(initialState);
                    const response = await axios.post('/signup', formData);
                    console.log(response);
                }} className="w-full flex flex-col gap-4 items-center justify-center">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-gray-400 overflow-hidden relative shrink-0">
                        <img className="w-full h-full object-cover" src={dp} alt="User profile picture" />
                        <div className="absolute inset-0 bg-gray-600/50 flex items-center justify-center text-white text-2xl font-medium cursor-pointer opacity-0 hover:opacity-100 transition-opacity duration-200">
                            +
                        </div>
                    </div>
                    <div className="flex flex-col min-[450px]:flex-row w-full gap-3 sm:gap-3.5">
                        <input
                            value={formData.firstName}
                            onChange={handleChange}
                            type="text"
                            name="firstName"
                            placeholder="First name"
                            className="w-full flex-1 py-2 sm:py-2.5 px-3 sm:px-3.5 rounded-xl text-emerald-950 placeholder:text-emerald-700/70 border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all duration-200 text-sm sm:text-base" />
                        <input
                            value={formData.lastName}
                            onChange={handleChange}
                            type="text"
                            name="lastName"
                            placeholder="Last name"
                            className="w-full flex-1 py-2 sm:py-2.5 px-3 sm:px-3.5 rounded-xl text-emerald-950 placeholder:text-emerald-700/70 border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all duration-200 text-sm sm:text-base" />
                    </div>
                    <input
                        value={formData.username}
                        onChange={handleChange}
                        type="text"
                        name="username"
                        placeholder="Username"
                        className="w-full py-2 sm:py-2.5 px-3 sm:px-3.5 rounded-xl text-emerald-950 placeholder:text-emerald-700/70 border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all duration-200 text-sm sm:text-base" />
                    <input
                        value={formData.email}
                        onChange={handleChange}
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full py-2 sm:py-2.5 px-3 sm:px-3.5 rounded-xl text-emerald-950 placeholder:text-emerald-700/70 border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all duration-200 text-sm sm:text-base" />
                    <input
                        value={formData.password}
                        onChange={handleChange}
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full py-2 sm:py-2.5 px-3 sm:px-3.5 rounded-xl text-emerald-950 placeholder:text-emerald-700/70 border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all duration-200 text-sm sm:text-base" />
                    <button
                        type="submit"
                        className="w-full bg-[#047857] hover:bg-[#065F46] py-2 sm:py-2.5 px-4 rounded-xl text-emerald-50 font-medium text-sm sm:text-base transition-all duration-200 cursor-pointer active:scale-99">
                        Sign Up
                    </button>
                </form>
                <h3 className="text-center text-xs sm:text-sm text-emerald-950/80 font-normal">
                    Already have an account?{" "}
                    <span onClick={() => navigate('/signin')} className="text-[#047857] hover:text-[#065F46] font-semibold cursor-pointer hover:underline transition-colors duration-200">
                        Sign In
                    </span>
                </h3>
            </div>
        </div>
    );
};

export default SignUp;
