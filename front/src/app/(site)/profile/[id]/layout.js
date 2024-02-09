'use client'

import ProfileDescriptor from '@/components/profile/ProfileDescriptor'
import ProfileNavigation from '@/components/profile/ProfileNavigation'

export default function ProfileLayout({ children, params }) {
  return (
    <main className="container w-9/12 mx-auto text-white">
      <ProfileDescriptor userId={params.id}/> 
      <ProfileNavigation userId={params.id}>
        {children}
      </ProfileNavigation>
    </main>
  )
}
