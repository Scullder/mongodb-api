'use client'

import { useState, useEffect } from 'react'
import * as UI from '@/components/ui/UI'
import { useStateContext } from '@/contexts/ContextProvider'
import ProfileBlog from '@/components/profile/ProfileBlog'
import * as Blog from '@/lib/models/Blog'

export default function Page({ params }) {
  const { user, setLoading } = useStateContext()

  const [isOwner] = useState(user && params.id === user.id)
  const [blogs, setBlogs] = useState([])
  const [page, setPage] = useState(0)

  let filter = {}

  useEffect(() => {
    setLoading(true)

    if (!isOwner) {
      filter.authorId = ['eq', params.id]
    }

    Blog.getAll((res) => {
      setBlogs(res.data)
      if (res.meta.last_page <= res.meta.current_page) {
        setPage(0)
      } else {
        setPage(1)
      }
      setLoading(false)
    }, () => {
      setLoading(false)
    }, filter)
  }, []);

  const loadMore = () => {
    if (page < 1) {
      return;
    }

    filter.page = page + 1
    setPage(page + 1)

    if (!isOwner) {
      filter.authorId = ['eq', params.id]
    }

    Blog.getAll((res) => {
      if (res.data) {
        setBlogs(blogs.concat(res.data))
      }

      if (res.meta.last_page <= res.meta.current_page) {
        setPage(0)
      }
    }, () => {
      setLoading(false)
    }, filter)
  }

  return (
    <>
      {isOwner && 
        <UI.Button _class="ml-auto" color="bg-primary" link="/blog/edit">Написать блог</UI.Button>
      }

      <div className="space-y-20">
        {blogs.map((blog) => {
          return <ProfileBlog blog={blog} key={blog.id} />  
        })}
      </div>

      {page > 0 && 
        <UI.Button onClick={loadMore} color="bg-white" textColor="text-black" width="w-[50%]" _class="mx-auto mt-10">Загрузить больше</UI.Button>
      }
    </>
  )
}
