import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
    const { user, logOut } = useAuth();
    const logOutUser = () => {
        logOut()
            .then((result) => {
                console.log("user logged out successfully", result.user);
            })
            .catch((error) => {
                console.error("Error", error.message);
            });
    };

    const navItems = (
        <>
            <li>
                <NavLink to="/home">Home</NavLink>
            </li>
            <li>
                <NavLink to="/sendParcel">Send A Parcel</NavLink>
            </li>
            <li>
                <NavLink to="/coverage">Coverage</NavLink>
            </li>
            {user && (
                <>
                    <li>
                        <NavLink to="/dashboard">Dashboard</NavLink>
                    </li>
                </>
            )}
            <li>
                <NavLink to="/about">About Us</NavLink>
            </li>
        </>
    );
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost lg:hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {" "}
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />{" "}
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                    >
                        {navItems}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">daisyUi</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{navItems}</ul>
            </div>
            <div className="navbar-end">
                {user ? (
                    <>
                        <li>
                            <button
                                className="btn btn-primary text-black"
                                onClick={logOutUser}
                            >
                                Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;
