'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStateContext } from '@/contexts/ContextProvider.jsx'
import Link from 'next/link'
import { IoMdExit } from "react-icons/io"
import { HiUser } from 'react-icons/hi'

export default function Header() {
  const { user, setUser, setToken, setLoading } = useStateContext()
  const [isNameHover, setIsNameHover] = useState(false)

  console.log(user)

  const itemClass = 'hover:cursor-pointer hover:border-b border-primary hover:text-primary p-2 text-sm uppercase font-bold';

  const router = useRouter();

  const logout = () => {
    setLoading(true)
    setUser({})
    setToken(null)
    router.push("/login");
  }

  return (
    <>
      <div className="absolute top-0 w-full z-20 shadowed"></div>
      <header className="w-full relative z-30 text-white font-border text-2xl">
        <div className="container w-9/12 mx-auto flex items-center h-[72px] justify-between">
          <div className="font-tim tracking-widest w-1/4 text-left">
            {/* <img src="/img/logo.png" className="w-36" /> */}
          </div>
          <div className="flex justify-center items-center gap-9 text-base tracking-wide w-2/4">
            <Link href="/" className={itemClass}>Главная</Link>
            <Link href="/blogs" className={itemClass}>Блоги</Link>
            {user && 
              <Link href={`/profile/${user.id}`} className={itemClass}>Мой профиль</Link>
            }
          </div>
          {user 
            ? 
              <div className="text-lg w-1/4 text-right relative" onMouseLeave={() => setIsNameHover(false)}>
                <div className="inline-flex hover:cursor-default" onMouseEnter={() => setIsNameHover(true)}>
                  <Link href={`/profile/${user.id}/settings`} className="flex items-center gap-2">
                    {user.image 
                      ? <img src={user.image} className="w-[30px] h-[30px] rounded-full border border-gray-700" />
                      : <div className="w-[30px] h-[30px] rounded-full border-2 border-gray-700 flex bg-gray-300 text-body justify-center items-center text-lg"><HiUser /></div>
                    }
                    <span>{user.name}</span>
                  </Link>
                </div>
                {isNameHover &&
                  <div className="absolute right-0 flex flex-col gap-2 py-2 px-3 items-end text-sm rounded bg-tile text-right">
                    <div className="hover:bg-tileDark hover:cursor-pointer p-1 px-2 w-full text-right rounded">Настройки</div>
                    <div onClick={logout} className="flex items-center justify-end hover:bg-tileDark hover:cursor-pointer p-1 px-2 w-full rounded">
                      <IoMdExit /><span className="">Выход</span>
                    </div>
                  </div>
                }
              </div>
            : 
              <Link href={`/login`} className="w-1/4 text-right text-sm">Войти</Link>
          }
        </div>
      </header>
    </>
  )
}