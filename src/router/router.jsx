import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import DashBoardLayout from "../layouts/DashBoardLayout";
import RootLayout from "../layouts/RootLayout";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register/Register";
import Coverage from "../pages/Coverage/Coverage";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";
import Home from "../pages/Home/Home/Home";
import SendParcel from "../pages/SendParcel/SendParcel";
import PrivateRoute from "../routes/PrivateRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: "home",
                Component: Home,
            },
            {
                path: "coverage",
                Component: Coverage,
                loader: () => fetch("/public/district.json"),
            },
            {
                path: "sendParcel",
                element: (
                    <PrivateRoute>
                        <SendParcel></SendParcel>
                    </PrivateRoute>
                ),
                loader: () => fetch("../../public/serviceCenter.json"),
            },
        ],
    },
    {
        path: "/",
        Component: AuthLayout,
        children: [
            {
                path: "login",
                Component: Login,
            },
            {
                path: "register",
                Component: Register,
            },
        ],
    },
    {
        path: "/dashboard",
        element: (
            <PrivateRoute>
                <DashBoardLayout />
            </PrivateRoute>
        ),
        children: [
            {
                path: "myParcels",
                element: <MyParcels />,
            },
        ],
    },
]);
