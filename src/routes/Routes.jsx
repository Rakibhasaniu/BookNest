import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Login from "../pages/login/Login";
import SignUp from "../pages/signup/SignUp";
import HomeN from "../pages/home/HomeN";
import Wishlist from "../pages/wishlist/Wishlist";
import BookDetails from "../pages/BookDetails/BookDetails";
import PrivateRoute from "./PrivateRoute";




export const router = createBrowserRouter([
    {
        path:'/',
        element:<Main/>,
        children:[
            {
                path:'/',
                element:<HomeN />
            },
            {
                path: '/books/:id', 
                // element: <BookDetails></BookDetails> 
                element: <PrivateRoute> <BookDetails></BookDetails> </PrivateRoute>
            },
            {
                path:'/wishlist',
                element:<Wishlist />
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