import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { AuthContext } from "../../Providers/AuthProviders";


const SignUp = () => {
    const { createUser, logOut } = useContext(AuthContext);
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const image = form.image.files[0];

        setError('');
        setSuccess('');

        if (password.length < 6) {
            setError('Password should be at least 6 characters long');
            return;
        } else if (!/[A-Z]/.test(password)) {
            setError('Password should contain at least 1 capital letter');
            return;
        } else if (!/[a-z]/.test(password)) {
            setError('Password should contain at least 1 lowercase letter');
            return;
        }

        try {
            await createUser(email, password, name, image);
            setSuccess('User registered successfully');
            form.reset();
            await logOut();
            navigate('/login');
        } catch (error) {
            console.error(error);
            setError('An error occurred during registration. Please try again later.');
        }
    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col">
                <div className="text-center lg:text-left">
                    <h1 className="text-3xl font-bold">Register Here</h1>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleRegister} className="card-body bg-green-50">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name="name" placeholder="Name" className="input input-bordered" required />
                        </div>
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
                        <div className="form-control">
                            <label htmlFor="image">Profile Image (Optional):</label>
                            <input type="file" id="image" name="image" accept="image/*" className="input input-bordered" />
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-accent bg-green-300">Register</button>
                        </div>
                    </form>
                    {error && <p className="text-red-700">{error}</p>}
                    {success && <p className="text-green-600">{success}</p>}
                    <p className="text-base p-4">Already have an account? <Link className='text-lg font-bold' to="/login">Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;