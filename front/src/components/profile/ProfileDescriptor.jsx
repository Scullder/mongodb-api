'use client'

import { useStateContext } from '@/contexts/ContextProvider'
import { useEffect, useState } from 'react'
import { HiUser } from 'react-icons/hi'
import { RiUserFollowFill, RiUserSharedFill } from 'react-icons/ri'
import { TbArticle } from 'react-icons/tb'
import { Button } from '@/components/ui/UI'
import * as Follower from '@/lib/models/Follower'
import * as User from '@/lib/models/User'
import Wallpaper from '@/components/Wallpaper.jsx'

export default function ProfileDescriptor(props) {
  const { user, setLoading } = useStateContext();

  const [isOwner, setIsOwner] = useState(true)

  const [isFollowed, setIsFollowed] = useState(false)
  const [followId, setFollowId] = useState(null)
  const [userDescriptor, setUserDescriptor] = useState({})

  useEffect(() => {
    setIsOwner(user && props.userId === user.id)

    if (isOwner) {
      Follower.getAll((res) => {
        if (res.data.length > 0 && res.data[0].followedUserId == props.userId) {
          setIsFollowed(true)
          setFollowId(res.data[0].id)
        }
      }, {
        userId: ['eq', user.id],
        followedUserId: ['eq', props.userId],
      })
    }

    User.get(props.userId, (res) => {
      setUserDescriptor(res.data)
    })
  }, [user, isFollowed])

  const follow = () => {
    setLoading(true)

    Follower.create({
      userId: user.id,
      followedUserId: props.userId,
    }, (data) => {
      setIsFollowed(true)
      setFollowId(data.id)
      setLoading(false)
    })
  }

  const stopFollow = () => {
    setLoading(true)

    Follower.destroy(followId, () => {
      setIsFollowed(false)
      setFollowId(null)
      setLoading(false)
    })
  }

  return (
    <>
      <Wallpaper src={userDescriptor.backImage} />
      <section id="descriptor" className="mt-[140px]|mb-[80px] my-[80px]">
        <div className="mx-auto flex gap-6 bg-background p-6 rounded">
          <div>
            <div className="w-[250px] h-[190px] relative">
              <div className='w-[250px] h-[250px] absolute -top-[60px]'>
                {userDescriptor.image
                  ? <img src={userDescriptor.image} className="w-full h-full object-top object-cover rounded drop-shadow -mt-16|" />
                  : <div className="w-full h-full rounded drop-shadow flex bg-gray-200 text-body justify-center items-center text-7xl"><HiUser /></div>
                }
              </div>
            </div>
            {!isOwner && 
              (() => {
                if (isFollowed) {
                  return <Button onClick={stopFollow} color="bg-gray-900" width="w-full" textColor="text-secondary" _class="border border-secondary mx-auto mt-2 text-base">Отписаться</Button>
                }
                
                return <Button onClick={follow} color="bg-secondary" width="w-full" _class="mx-auto mt-2 text-base">Подписаться</Button>
              })()
            }
          </div>
          <div className="w-9/12 relative">
            <div className="flex items-end mb-2">
              <h1 className="font-bold">{userDescriptor.name}</h1>
              {/* <h2 className="text-3xl text-red ml-4">
                <label className="flex items-end"><i className="ri-arrow-up-fill"></i>{dsc.level}1 lv.</label>
              </h2> */}
              {/* <h2 className="text-2xl text-secondary ml-auto">{userDescriptor.tag}</h2> */}
            </div>
            <div className="max-h-3/5 overflow-auto">{userDescriptor.description}</div>
            <div className={`mt-auto pt-4 ${userDescriptor.description && 'absolute bottom-0 w-full'}`}>
              <div className={`flex gap-14 ${userDescriptor.description ? 'text-xl justify-center' : 'text-2xl'} text-gray-200  items-center`}>
                {userDescriptor.followersCount !== undefined && <span className="flex justify-center items-center gap-2"><RiUserFollowFill /> подписчиков: {userDescriptor.followersCount} </span>}
                {userDescriptor.followingCount !== undefined && <span className="flex justify-center items-center gap-2"><RiUserSharedFill /> подписок: {userDescriptor.followingCount} </span>}
                {userDescriptor.publicationsCount !== undefined && <span className="flex justify-center items-center gap-2"><TbArticle /> публикаций: {userDescriptor.publicationsCount} </span>}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}