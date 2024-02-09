'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useStateContext } from '@/contexts/ContextProvider'

export default function ProfileNavigation(props) {
  const { user, token, setAlertMessage, setLoading } = useStateContext();
  const [isOwner] = useState(user && props.userId === user.id)

  const navItemClass = "p-4 text-center hover:cursor-pointer hover:bg-gray-300 hover:text-black bg-tile";

  return (
    <section id="content" className="w-full mx-auto mb-[100px] bg-background">
      <nav className={`flex justify-between gap-[1px] w-full text-lg text-center`}>
        <Link href={`/profile/${props.userId}`} className="w-full"><div className={navItemClass}>Лента</div></Link>
        <Link href={`/profile/${props.userId}/blogs`} className="w-full"><div className={navItemClass}>Блоги</div></Link>
        <Link href={`/profile/${props.userId}/followers`} className="w-full"><div className={navItemClass}>Подписчики</div></Link>
        <Link href={`/profile/${props.userId}/following`} className="w-full"><div className={navItemClass}>Подписки</div></Link>
        {isOwner && 
          <Link href={`/profile/${props.userId}/settings`} className="w-full"><div className={navItemClass}>Настройки</div></Link>
        }
      </nav>
      <div className="px-20 py-10 mx-auto">
        {props.children}
      </div>
    </section>
  )
}