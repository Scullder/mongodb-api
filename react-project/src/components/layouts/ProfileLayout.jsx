import { useStateContext } from "../../contexts/ContextProvider.jsx"
import { Navigate, Outlet } from "react-router-dom"
import { Link } from 'react-router-dom'
import Wallpaper from "../Wallpaper";
import ProfileDescriptor from '../profile/ProfileDescriptor'

export default function ProfileLayout() {
    const {user} = useStateContext();
    console.log(user);

    const descriptorData = {
        name: 'Electric Youth',
        level: 23,
        tag: '@electric_youth',
        description: 'The thought of recreating the past with music is not interesting to us, it\'s probably been the biggest misconception of our music and what we\'re about thus far. The reality is, we\'re much more interested in creating things for the future than things from the past. We are nostalgic people, not in the sense that we long for a different time, because we love the present, but how could we not be reminded of the past when every day, we see the person we had a crush on since 7th grade?',
        followersCount: 1000,
        followingCount: 139,
        publicationsCount: 203,
    }

    const navItemClass = "p-5 border-r border-gray-900 hover:cursor-pointer";

    return (
        <div>
            <Wallpaper image="bg-[url('/img/profile.jpg')]"/>
            <main className="container w-9/12 mx-auto text-white">
                <div className="h-screen flex items-center">
                    <ProfileDescriptor data={user} />
                </div>
                <section id="content" className="w-full mx-auto mb-[100px] bg-body">
                    <nav className="grid grid-cols-6 text-lg text-center">
                        <Link to="/profile"><div className={navItemClass}>Лента</div></Link>
                        <Link to="/profile/blogs"><div className={navItemClass}>Блоги</div></Link>
                        <Link to="/storage"><div className={navItemClass}>Сохранённое</div></Link>
                        <Link to="/followers"><div className={navItemClass}>Подписчики</div></Link>
                        <Link to="/following"><div className={navItemClass}>Подписки</div></Link>
                        <Link to="/profile/options"><div className={navItemClass}>Настройки</div></Link>
                    </nav>

                    <div className="w-[90%] mx-auto">
                        <Outlet/>
                    </div>
                </section>
            </main>
        </div>
    )
}