import { Navigate, Outlet } from "react-router-dom"
import { useStateContext } from "../../contexts/ContextProvider"
import Wallpaper from "../Wallpaper";

export default function GuestLayout() {
    const {token} = useStateContext();
    
    if (token) {
        return <Navigate to='/user' />
    }

    return (
        <div className="w-full h-full text-white mx-auto container">
            <Wallpaper image="bg-login"/>
            <Outlet/>
        </div>
    )
}