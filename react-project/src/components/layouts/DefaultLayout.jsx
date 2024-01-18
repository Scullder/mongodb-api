import { Navigate, Outlet } from "react-router-dom"
import { useStateContext } from "../../contexts/ContextProvider"
import Header from "../Header"
import Wallpaper from "../Wallpaper";
import Alert from "../interface/Alert";

export default function DefaultLayout() {
    const {token} = useStateContext();
    
    if (!token) {
        return <Navigate to='/login' />
    }

    return (
        <div className="text-white">
            <Header />
            <Outlet/>
            <Alert />
        </div>
    )
}