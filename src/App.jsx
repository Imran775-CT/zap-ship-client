import { StrictMode } from "react";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./router/router.jsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Aos from "aos";
import "aos/dist/aos.css";
import AuthProvider from "./contexts/AuthContext/AuthProvider.jsx";

Aos.init();

const queryClient = new QueryClient();

function App() {
    return (
        <StrictMode>
            <div className="font-urbanist max-w-7xl mx-auto">
                <QueryClientProvider client={queryClient}>
                    <AuthProvider>
                        <RouterProvider router={router} />
                    </AuthProvider>
                </QueryClientProvider>
            </div>
        </StrictMode>
    );
}

export default App;
