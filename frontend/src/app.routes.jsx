import { createBrowserRouter} from "react-router";
import Register from "./features/auth/pages/register";
import Login from "./features/auth/pages/login";







export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    }
])