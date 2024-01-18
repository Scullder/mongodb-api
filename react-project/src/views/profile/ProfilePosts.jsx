import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../../axios-client.js'
import ProfilePost from '../../components/profile/ProfilePost.jsx'

export default function ProfilePosts() {
    const [posts, setPosts] = useState([]); 

    useEffect(() => {
        axiosClient
            .get('/posts')
            .then(({data}) => {
                setPosts(data.data);
            })
            .catch((error) => {
                const response = error.response;
                if(response && response.status === 422) {
                    setErrors(response.data.errors);
                    console.log(response.data.errors);
                }
            });
    }, []);

    return (
        <>
            <Link to="/post/creating">
                <button className="block w-1/3 h-[60px] my-5 ml-auto rounded-sm tracking-widest text-lg bg-black text-green font-bold hover:bg-green hover:text-black">
                    NEW POST
                </button>
            </Link>
                
            <div className="space-y-20 pb-20">
                {posts.map(post => (
                    <ProfilePost post={post} key={post.id}/>
                ))}
            </div>
        </>
    )
}
