import { useState } from "react"
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="min-h-screen w-full bg-[#ECFDF5] flex items-center justify-center p-4 sm:p-6 md:p-8">
            <div className="w-full max-w-md sm:max-w-125 bg-[#FFFFFF] rounded-2xl shadow-sm flex items-center justify-center flex-col gap-6 py-8 px-6 sm:py-10 sm:px-10">
                <h1 className="text-[#064E3B] font-bold text-2xl sm:text-3xl text-center">Sign In</h1>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    setEmail('');
                    setPassword('');
                }} className="w-full flex flex-col gap-4">
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full py-2 sm:py-2.5 px-3 sm:px-3.5 rounded-xl text-emerald-950 placeholder:text-emerald-700/70 border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all duration-200 text-sm sm:text-base" />
                    <input
                        value={password}
                        onChange={(e) => setEmail(e.target.value)}
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full py-2 sm:py-2.5 px-3 sm:px-3.5 rounded-xl text-emerald-950 placeholder:text-emerald-700/70 border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all duration-200 text-sm sm:text-base" />
                    <button
                        type="submit"
                        className="w-full bg-[#047857] hover:bg-[#065F46] py-2 sm:py-2.5 px-4 rounded-xl text-emerald-50 font-medium text-sm sm:text-base transition-colors duration-200 cursor-pointer">
                        Sign In
                    </button>
                </form>
                <h3 className="text-center text-xs sm:text-sm text-emerald-950/80 font-normal">
                    Don't have an account?{" "}
                    <span onClick={() => navigate('/signup')} className="text-[#047857] hover:text-[#065F46] font-semibold cursor-pointer hover:underline transition-colors duration-200">
                        Sign Up
                    </span>
                </h3>
            </div>
        </div>
    )
}

export default SignIn