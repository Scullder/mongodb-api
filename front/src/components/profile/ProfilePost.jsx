'use client'

import { useState } from 'react'
import { useStateContext } from '@/contexts/ContextProvider'
import Link from 'next/link'
import * as UI from '@/components/ui/UI'
import ImageSlider from '../ui/ImageSlider'
import Modal from '@/components/ui/modal/Modal'
import PostEditing from '@/components/profile/forms/PostEditing'
import { BiSolidComment } from 'react-icons/bi'
import { HiUser } from 'react-icons/hi'
import { RxDotsHorizontal } from "react-icons/rx"
import * as Comment from "@/lib/models/Comment"

export default function ProfilePost(props) {
  const post = props.post

  const { user, token } = useStateContext()

  const [isPostHover, setPostHover] = useState(false)
  const [isCommentsOpened, setCommentsOpened] = useState(false)
  const [comments, setComments] = useState(post.comments)
  const [comment, setComment] = useState('')
  const [errors, setErrors] = useState({})
  const [isEditing, setIsEditing] = useState(false)
  const [minHeight, setMinHeight] = useState('')

  const handleCommentOpened = () => {
    setMinHeight(!isCommentsOpened ? 'min-h-[700px]' : '')
    setCommentsOpened(!isCommentsOpened)
  }

  const handlePostFormVisability = () => {
    setIsEditing(!isEditing)
  }

  const unshiftComment = (comment) => {
    const newComments = comments
    newComments.push(comment)
    setComments(newComments)
  }

  const sendComment = (e) => {
    const payload = {
      authorId: user.id,
      postId: post.id,
      text: comment,
    }

    Comment.create(payload, (res) => {
      setComment('')
      setErrors({})
      unshiftComment(res.data)
    }, (errors) => {
      setErrors(errors)
    })
  }

  return (
    <div className="w-full flex flex-col my-10">
      <Modal isVisible={isEditing} visabilityHandler={setIsEditing}>
        <PostEditing 
          post={post} 
          index={props.index}
          closeModal={setIsEditing} 
          updatePost={props.updatePost}
          removePost={props.removePost}
        />
      </Modal>
      <div className={`relative flex flex-col m-auto p-4 rounded w-full ${minHeight} bg-tile drop-shadow`} onMouseEnter={() => setPostHover(true)} onMouseLeave={() => setPostHover(false)}>
        <div className="flex items-center gap-2 mb-4">
          {post.author && 
            <Link href={`/profile/${post.author.authorId}`} className="flex">
              {post.author.image 
                ? <img src={post.author.image} className="w-[50px] h-[50px] rounded-full border border-gray-700" />
                : <div className="w-[50px] h-[50px] rounded-full border-2 border-gray-700 flex bg-gray-300 text-body justify-center items-center text-lg"><HiUser /></div>
              }
              <div className="flex flex-col ml-2">
                <span>{post.author.name}</span>
                <span className="text-gray-500 ">{post.date}</span>
              </div>
            </Link>
          }

          {user && props.authorId == post.authorId && props.authorId == user.id && token &&
            <div onClick={handlePostFormVisability} className="ml-auto text-3xl text-input hover:text-inputFocus hover:cursor-pointer p-2">
              <RxDotsHorizontal />
            </div>
          }
        </div>

        {post.title && 
          <h2 className="text-xl font-medium">{post.title}</h2>
        }
  
        {post.text && 
          <p className="my-4">{post.text}</p>
        }
        
        {post.images &&
          <ImageSlider slides={post.images} globKey={post.id}/>
        }

        {isPostHover &&
          <button onClick={handleCommentOpened} className="absolute right-4 bottom-4 w-[60px] h-[60px] text-primary hover:text-primaryDarker">
            <div className="relative w-full h-full text-center flex items-center justify-center">
              <div className="absolute top-0 text-6xl">
                <BiSolidComment />
              </div>
              <div className="absolute top-2 text-2xl text-white font-semibold">{post.comments.length}</div>
            </div>
          </button>
        }

        {isCommentsOpened &&
          <>
            <div onClick={handleCommentOpened} className="absolute top-0 right-0 w-full h-full bg-black opacity-60 cursor-pointer"></div>
            <div className="absolute top-0 left-0 w-3/4 h-full bg-tile p-2 flex flex-col">
              <div className="py-4 px-5">
                <h2 className="text-2xl font-semibold">Комментариев ({post.comments.length})</h2>
              </div>
              <div className="bg-body w-full h-full flex-grow overflow-auto rounded">
                {comments.map(comment => (
                  <div className="bg-tile p-2 rounded m-4" key={comment.id}>
                    <div className="flex items-center">
                      <Link href={`/profile/${comment.author.authorId}`} className="flex items-center gap-2">
                        {comment.author.image                         
                          ? <img src={comment.author.image} className="w-[35px] h-[35px] rounded-full border border-gray-700" />
                          : <div className="w-[35px] h-[35px] rounded-full border-2 border-gray-700 flex bg-gray-300 text-body justify-center items-center text-lg"><HiUser /></div>
                        }
                        <span className="font-semibold">{comment.author.name}</span>
                      </Link>
                      <div className="text-gray-500 ml-auto">{comment.date}</div>
                    </div>
                    <p className="m-0 mt-2">{comment.text}</p>
                  </div>
                ))}
              </div>
              
              {user && 
                <div className="py-2 h-[160px] relative">
                  <UI.Input 
                    handle={setComment} 
                    error={errors.text} 
                    type="textarea"
                    placeholder="Введите ваш комментарий..." 
                    width="w-full" 
                    height="h-full"
                    bg="bg-body" 
                    resize="resize-none" 
                  >{comment}</UI.Input>
                  <UI.Button onClick={sendComment} _class="absolute right-3 bottom-3"  width="w-[110px]" height="h-[40px]">отправить</UI.Button>
                </div>
              }
            </div>
          </>
        }
      </div>
    </div>
  )
}