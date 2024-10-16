import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Login from "../pages/login/Login";
import SignUp from "../pages/signup/SignUp";
import Home from "../pages/home/Home";




export const router = createBrowserRouter([
    {
        path:'/',
        element:<Main/>,
        children:[
            {
                path:'/',
                element:<Home />
            },
            {
                path:'login',
                element:<Login />
            },
            {
                path:'register',
                element:<SignUp />
            },
        ]
    }
])