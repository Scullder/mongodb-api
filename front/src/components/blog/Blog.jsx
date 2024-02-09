'use client'

import { useState, useEffect } from 'react'
import { useStateContext } from '@/contexts/ContextProvider';
import Link from 'next/link'
import Wallpaper from '@/components/Wallpaper.jsx'
import * as UI from '@/components/ui/UI'
import { HiUser } from 'react-icons/hi'
import { notFound } from 'next/navigation';

export default function Page(props) {
  const blog = props.blog.data;
  
  const { user, setAlertMessage } = useStateContext();
  const [isOwner] = useState(user && blog.author.authorId === user.id)
  //const [comment, setComment] = useState(null);
  //const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOwner && !blog.isPublic) {
      setAlertMessage({
        title: 'Внимание!',
        text: 'Блог находиться в режиме разработки.',
        status: 'info',
      })
    }
  }, [])

  if ((!blog || !blog.isPublic && !isOwner)) {
    return notFound()
  }

  /* blog.comments = [
    {
      id: 1,
      author: {
          authorId: 1,
          name: 'FlameDragon',
          image: '',
      },
      text: 'Después de 11 años aun sigo escuchando esta lista, así es es 2022',
      date: '2023-08-06 16:58:55',
    },
    {
      id: 2,
      author: {
          authorId: 2,
          name: 'Mr.Silver',
          image: '',
      },
      text: 'Amazing voice, no doubt you will continue to make this great music',
    },
    {
      id: 3,
      author: {
          authorId: 3,
          name: 'Judy',
          image: '',
      },
      text: 'This song is absolutely beautiful i love it so damn much its living rent free in my head for the past 3 weeks PLEASE make more like this and continue being unique and talented!!!!! your voice is just so soothing!',
    },
    {
      id: 4,
      author: {
          authorId: 1,
          name: 'FlameDragon',
          image: '',
      },
      text: 'Después de 11 años aun sigo escuchando esta lista, así es es 2022',
      date: '2023-08-06 16:58:55',
    },
    {
      id: 5,
      author: {
          authorId: 2,
          name: 'Mr.Silver',
          image: '',
      },
      text: 'Amazing voice, no doubt you will continue to make this great music',
    },
    {
      id: 6,
      author: {
          authorId: 3,
          name: 'Judy',
          image: '',
      },
      text: 'This song is absolutely beautiful i love it so damn much its living rent free in my head for the past 3 weeks PLEASE make more like this and continue being unique and talented!!!!! your voice is just so soothing!',
    },
  ] */

  /* const sendComment = (e) => {
    const payload = {
      id: blog.id,
      authorId: user.id,
      bId: post.id,
      text: comment,
    }

    axiosClient
      .post('/comments', payload)
      .then(({ data }) => {
        setComment('');
      })
      .catch((error) => {
        const response = error.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  } */

  return (
    <>
      <Wallpaper src={blog.image} />
      <main className="text-gray-300 my-[100px] z-30">
        <section id="blog" className="container relative w-9/12 mx-auto text-lg rounded bg-tileDark">
          <div className="flex items-center bg-tile p-3 text-lg rounded justify-between">
            {blog.author && 
              <Link href={`/profile/${blog.author.authorId}`} className="flex items-center gap-4">
                {blog.author.image 
                  ? <img src={blog.author.image} className="w-[50px] h-[50px] rounded-full border border-gray-700" />
                  : <div className="w-[50px] h-[50px] rounded-full border-2 border-gray-700 flex bg-gray-300 text-body justify-center items-center text-lg"><HiUser /></div>
                }
                <div className="flex flex-col">
                  <span>{blog.author.name}</span>
                  <span className="text-gray-500 text-sm">{blog.date}</span>
                </div>
              </Link>
            }
            {isOwner && 
              <UI.Button link={`/blog/edit/${blog.id}`}>Редактировать</UI.Button>
            }
          </div>
          <div className="py-10 px-20">
            <div className="">
              <h1 className="font-semibold">{blog.title}</h1>
              <p className="italic">{blog.description}</p>
            </div>
            <div className="mt-10" dangerouslySetInnerHTML={{__html:blog.content}} >
            </div>
          </div>
        </section>
        {/* <section id="comments" className="my-10 container relative w-9/12 mx-auto">
          <div className="relative bg-tileDark rounded p-5">
            <h2 className="font-semibold">Комментарии ({blog.comments.length})</h2>
            {blog.comments.map(comment => (
                <div className="bg-tile p-3 rounded my-5" key={comment.id}>
                  <div className="flex items-center gap-3">
                    <img src={comment.author.image} className="w-[40px] h-[40px] rounded-full border border-gray-700" />
                    <label className="font-bold">{comment.author.name}</label>
                    <label className="text-gray-500 ml-auto">{comment.date}</label>
                  </div>
                  <p className="my-2">{comment.text}</p>
                </div>
            ))}
            <div className="h-[150px] relative">
              <textarea 
                onChange={(e) => setComment(e.target.value)} 
                value={comment} 
                className="w-full h-full bg-body rounded outline-none p-2 pb-[45px] resize-none border-2 border-tile" 
                placeholder="Введите ваш комментарий..."
              ></textarea>
              <UI.Button onClick={sendComment} _class="absolute right-3 bottom-3" width="w-[110px]" height="h-[40px]">отправить</UI.Button>
            </div>
          </div>
        </section> */}
      </main>
    </>
  )
}
