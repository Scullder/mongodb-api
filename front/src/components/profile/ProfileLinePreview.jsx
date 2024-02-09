'use client'

import { HiUser } from 'react-icons/hi'
import { Button } from '@/components/ui/UI'
import { FaTelegram, FaDiscord, FaInstagram } from "react-icons/fa";

export default function ProfileLinePreview({ profile }) {
  if (!profile) {
    return ;
  }

  const renderSocial = (icon, social, color = '', link = null) => {
    return (
      <div className={`flex items-center ${color}`}>
        <span className={`text-3xl mr-2 ${color}`}>{icon}</span>{social}
      </div>
    )
  }

  const truncateText = (text, size) => {
    return text.substring(0, size).trim()
  }

  return (
    <div className="flex items-center gap-4 p-4 rounded bg-tile">
      <div>
        <div className="w-[90px] h-[90px]">
          {profile.image
            ? <img src={profile.image} className="w-full h-full object-center object-cover rounded drop-shadow" />
            : <div className="w-full h-full rounded border-2 border-tile drop-shadow flex bg-gray-200 text-body justify-center items-center text-3xl"><HiUser /></div>
          }
        </div>
      </div>
      <div className="max-w-[80%] w-full">
        <span className="font-semibold text-lg">{profile.name}</span>
        {profile.description && 
          <div className="mt-1 text-input">{truncateText(profile.description, 100)}...</div>
        }
        <div className="flex items-center justify-center gap-8 mt-4">
          {profile.telegram && 
            renderSocial(<FaTelegram />, profile.telegram, 'text-sky-600')
          }

          {profile.discord && 
            renderSocial(<FaDiscord />, profile.discord, 'text-zinc-200')
          }

          {profile.instagram && 
            renderSocial(<FaInstagram />, profile.instagram, 'text-fuchsia-600')
          }
        </div>
      </div>
      <div className="ml-auto">
        <Button link={`/profile/${profile.id}`} width="w-auto" height="h-auto" _class="py-2 px-6">Перейти</Button>
      </div>
    </div>
  )
}