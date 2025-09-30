import {
    FiCreditCard,
    FiHome,
    FiPackage,
    FiSearch,
    FiUser,
} from "react-icons/fi";
import { NavLink, Outlet } from "react-router-dom";
import ProfastLogo from "../pages/shared/ProfastLogo/ProfastLogo";

const DashBoardLayout = () => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

            {/* Main content */}
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="navbar bg-base-300 w-full lg:hidden">
                    <div className="flex-none">
                        <label
                            htmlFor="my-drawer-2"
                            aria-label="open sidebar"
                            className="btn btn-square btn-ghost"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>
                </div>

                {/* 👇 Page content will load here */}
                <div className="p-4">
                    <Outlet />
                </div>
            </div>

            {/* Sidebar */}
            <div className="drawer-side">
                <label
                    htmlFor="my-drawer-2"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    {/* Sidebar content */}
                    <ProfastLogo></ProfastLogo>
                    <li>
                        <NavLink
                            to="/dashboard"
                            className="flex items-center gap-2"
                        >
                            <FiHome /> Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/myParcels"
                            className="flex items-center gap-2"
                        >
                            <FiPackage /> My Parcels
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/paymentHistory"
                            className="flex items-center gap-2"
                        >
                            <FiCreditCard /> Payment History
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/track"
                            className="flex items-center gap-2"
                        >
                            <FiSearch /> Track a Package
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/profile"
                            className="flex items-center gap-2"
                        >
                            <FiUser /> Profile
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default DashBoardLayout;
