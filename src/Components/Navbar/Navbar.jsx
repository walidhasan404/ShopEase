import { useContext } from "react";
import { FaShopify } from "react-icons/fa";
import { AuthContext } from "../../Providers/AuthProviders";
import { Link } from "react-router-dom";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => console.log('Log out successful'))
            .catch(error => console.log(error));
    };

    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <Link to="/" className="btn btn-ghost text-xl">
                        <FaShopify /> ShopEase
                    </Link>
                </div>
                <div className="flex-none">
                    {user ? (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt={user.displayName || "User Avatar"}
                                        src={user.photoURL || "default-avatar-url"} // Handle if photoURL is null
                                    />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                <li>
                                    <Link to="/profile" className="justify-between">
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={handleLogOut}>Logout</button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <Link to="/login" className="btn btn-primary">Login</Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
