import { Outlet } from "react-router-dom";
import Navbar from "../pages/shared/navbar/Navbar";

const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet />
        </div>
    );
};

export default Main;