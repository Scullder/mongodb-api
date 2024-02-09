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
      userId: ['eq', params.id],
      //followedUserId: params.userId,
    })
  }, [])

  return (
    <div className="space-y-10">
      {profiles.map(profile => (
        <ProfileLinePreview profile={profile.user} key={profile.id}/>
      ))}
    </div>
  )
}
