'use client'

import { useState, useEffect } from 'react'
import { useStateContext } from '@/contexts/ContextProvider'
import ProfilePost from '@/components/profile/ProfilePost'
import * as UI from '@/components/ui/UI'
import Modal from '@/components/ui/modal/Modal'
import PostCreating from '@/components/profile/forms/PostCreating'
import * as Post from '@/lib/models/Post'

export default function ProfilePosts({ params }) {
  const { user, setLoading } = useStateContext()

  const [isOwner] = useState(user && params.id === user.id)
  const [posts, setPosts] = useState([])
  const [postFormVisability, setPostFormVisability] = useState(false)
  const [page, setPage] = useState(0)

  let filter = {}

  useEffect(() => {
    setLoading(true)

    if (!isOwner) {
      filter.authorId = ['eq', params.id]
    }

    Post.getAll((res) => {
      setPosts(res.data)

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

  const handlePostFormVisability = () => {
    setPostFormVisability(!postFormVisability)
  }

  const unshiftPost = (post) => {
    const newPosts = posts
    newPosts.unshift(post)
    setPosts(newPosts)
  }

  const removePost = (index) => {
    const newPosts = posts
    newPosts.splice(index, 1)
    setPosts(newPosts)
  }

  const updatePost = (index, post) => {
    const newPosts = posts
    newPosts[index] = post
    setPosts(newPosts)
  }

  /* const filter = [
    { label: 'option1', value: 12 }, 
    { label: 'option2', value: 21 },
  ]

  const sort = [
    { label: 'time', value: 12 }, 
    { label: 'likes', value: 21 },
  ] */

  const loadMore = () => {
    if (page < 1) {
      return;
    }

    filter.page = page + 1
    setPage(page + 1)

    console.log(filter)

    Post.getAll((res) => {
      if (res.data) {
        setPosts(posts.concat(res.data))
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
      {/* <div className="space-x-4">
        <UI.Select options={filter}>Фильтр</UI.Select>
        <UI.Select options={sort}>Сортировка</UI.Select>
      </div> */}

      {isOwner &&
        <>
          <Modal isVisible={postFormVisability} visabilityHandler={setPostFormVisability}>
            <PostCreating closeModal={setPostFormVisability} unshiftPost={unshiftPost} />
          </Modal>
          <UI.Button onClick={handlePostFormVisability} _class="ml-auto">Новый пост</UI.Button>
        </>
      }

      <div className="space-y-20">
        {posts.map((post, index) => (
          <ProfilePost
            post={post}
            key={post.id}
            index={index}
            authorId={params.id}
            updatePost={updatePost}
            removePost={removePost}
          />
        ))}
      </div>

      {page > 0 && 
        <UI.Button onClick={loadMore} color="bg-white" textColor="text-black" width="w-[50%]" _class="mx-auto mt-10">Загрузить больше</UI.Button>
      }
    </>
  )
}
