import { useState } from 'react'
import { useStateContext } from '../contexts/ContextProvider.jsx'
import { Link } from 'react-router-dom'

export default function Header() {
    const [isVisible, setVisible] = useState(false);

    const itemClass = 'hover:cursor-pointer hover:border-b border-orange hover:text-orange p-2 text-sm uppercase font-bold';

    return (
        <>{/* mix-blend-exclusion */}
            <div className="absolute top-0 w-full z-40 shadowed"></div>
            <header className="w-full relative z-50 text-white font-border" onMouseEnter={(e) => setVisible(true)} onMouseLeave={(e) => setVisible(false)}>
                <div className="container w-9/12 mx-auto flex items-center h-[72px] text-2xl justify-between">
                    <div className="font-tim tracking-widest w-1/4 text-left">
                        FLASHwrite
                    </div>
                    <ul className="flex justify-center items-center gap-9 text-base tracking-wide w-2/4">
                        <li className={itemClass}><Link to="/">Главная</Link></li>
                        <li className={itemClass}><Link to="/blogs">Блоги</Link></li>
                        <li className={itemClass}><Link to="/users">Пользователи</Link></li>
                        <li className={itemClass}><Link to="/profile">Профиль</Link></li>
                    </ul>
                    <div className="text-lg tracking-widest w-1/4 text-right">
                        <i className="ri-shield-user-line"></i>Invader942
                    </div>
                </div>
                {/* { isVisible &&
                    <div className="absolute h-[56px] w-screen bg-navbar border-b-[4px] border-header">
                        <ul className="text-body flex justify-center items-center gap-9 text-md h-full tracking-wide">
                            <li className="hover:cursor-pointer hover:border-b border-body"><Link to="/">Главная</Link></li>
                            <li className="hover:cursor-pointer hover:border-b border-body"><Link to="/blogs">Блоги</Link></li>
                            <li className="hover:cursor-pointer hover:border-b border-body"><Link to="/users">Пользователи</Link></li>
                            <li className="hover:cursor-pointer hover:border-b border-body"><Link to="/profile">Профиль</Link></li>
                        </ul>
                    </div>
                } */}
            </header>
        </>
    )
}