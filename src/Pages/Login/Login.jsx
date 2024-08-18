import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { FaGoogle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { AuthContext } from "../../Providers/AuthProviders";

const Login = () => {
    const { signIn, googleSignIn } = useContext(AuthContext);
    const [logError, setLogError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPass, setShowPass] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = async (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        try {
            await signIn(email, password);
            setSuccess('Login successful!');
            setLogError('');
            Swal.fire({
                icon: 'success',
                title: 'Login Successful',
                text: 'Welcome back!',
                confirmButtonText: 'OK',
            });
            location('/');
        } catch (error) {
            console.error('Login error:', error);
            setLogError('Invalid email or password. Please try again.');
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: 'Invalid email or password. Please try again.',
                confirmButtonText: 'OK'
            });
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
            setSuccess('Login successful with Google!');
            navigate('/');
            Swal.fire({
                icon: 'success',
                title: 'Google Sign-In Successful',
                text: 'Welcome back!',
                confirmButtonText: 'OK'
            });
            setLogError('');
        } catch (error) {
            console.error('Google Sign-In error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Google Sign-In Failed',
                text: 'Could not sign in with Google. Please try again.',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <div className="min-h-screen bg-base-200">
            <div className="hero-content flex-col">
                <div className="text-center lg:text-left">
                    <h1 className="text-4xl font-bold">Login now</h1>
                </div>
                <div className="card p-4 shrink-0 w-full max-w-sm shadow-2xl bg-blue-50">
                    <form onSubmit={handleLogin}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="Email" className="input input-bordered" required />
                        </div>
                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type={showPass ? "text" : "password"} name="password" placeholder="Password" className="input input-bordered pr-10" required />
                            <button
                                type="button"
                                className="absolute top-14 right-3 transform -translate-y-1/2 focus:outline-none"
                                onClick={() => setShowPass(!showPass)}
                            >
                                {showPass ? <IoMdEyeOff /> : <IoMdEye />}
                            </button>
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    {logError && <p className="text-red-700">{logError}</p>}
                    {success && <p className="text-green-600">{success}</p>}
                    <div className="text-center mt-4">
                        <h2 className="text-lg font-medium">Login With</h2>
                        <div className="flex justify-center mt-2">
                            <button className="btn btn-outline mr-2" onClick={handleGoogleSignIn}>
                                <FaGoogle />
                            </button>
                        </div>
                    </div>
                    <p className="text-base p-4">New to the website? <Link className='text-lg font-bold' to="/signup">Register</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;