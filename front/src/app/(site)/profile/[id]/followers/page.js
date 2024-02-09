'use client'

import ProfileLinePreview from '@/components/profile/ProfileLinePreview';
import { useStateContext } from '@/contexts/ContextProvider';
import * as Follower from '@/lib/models/Follower'
import { useEffect, useState } from 'react'

export default function Page({ params }) {
  const { user, setAlertMessage, setLoading } = useStateContext();

  const [profiles, setProfiles] = useState([])

  useEffect(() => {
    Follower.getAll((res) => {
      setProfiles(res.data)
    }, {
      //userId: params.id,
      followedUserId: ['eq', params.id],
    })
  }, [])

  return (
    <div className="space-y-10">
      {profiles.map(profile => (
        <ProfileLinePreview profile={profile.followedUser} key={profile.id}/>
      ))}
    </div>
  )
}
