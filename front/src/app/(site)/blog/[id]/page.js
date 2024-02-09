import Blog from '@/components/blog/Blog'
import { notFound } from 'next/navigation';
//import styles from './style.module.css'

async function getBlog(id) {
  try {
    return await fetch(`${process.env.apiUrl}/api/blogs/${id}`, { cache: 'no-store' })
      .then(res => {
        if (res.status == 404) {
          return false
        }
        
        return res.json()
      });
  } catch(e) {
    console.log(e);
  }
}

export default async function Page({params}) {
  const blog = await getBlog(params.id)

  return (
    <Blog blog={blog} params={params}/>
  )
}
