'use client'

import ImageSlider from '../ui/ImageSlider'
import Link from 'next/link'
import { HiUser } from 'react-icons/hi'

export default function ProfileBlog({ blog }) {
  return (
    <Link href={`/blog/${blog.id}`} className="w-full flex flex-col my-10">
      <div className="relative m-auto p-4 rounded w-full bg-tile drop-shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          {blog.author && 
            <Link href={`/profile/${blog.author.authorId}`} className="flex">
              {blog.author.image 
                ? <img src={blog.author.image} className="w-[50px] h-[50px] rounded-full border border-gray-700" />
                : <div className="w-[50px] h-[50px] rounded-full border-2 border-gray-700 flex bg-gray-300 text-body justify-center items-center text-lg"><HiUser /></div>
              }
              <div className="flex flex-col ml-2">
                <span>{blog.author.name}</span>
                <span className="text-gray-500 ">{blog.date}</span>
              </div>
            </Link>
          }
        </div>
        <h2 className="text-xl font-medium">{blog.title}</h2>
        <p className="my-4">{blog.text}</p>
        <div className="w-full h-full">
          <ImageSlider slides={[blog.image]}/>
        </div>
      </div>
    </Link>
  )
}