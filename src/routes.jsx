import Login from "./components/Login";
import Main from "./components/Main";
import Edit from "./components/Edit";
import { LOGIN_ROUTE, MAIN_ROUTE, EDIT_ROUTE } from "./utils/consts";

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Login
    }
];

// for authorized users
export const privateRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Main
    },
    {
        path: EDIT_ROUTE,
        Component: Edit
    },
];
