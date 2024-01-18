import {Navigate, createBrowserRouter} from "react-router-dom"
import GuestLayout from "./components/layouts/GuestLayout"
import DefaultLayout from "./components/layouts/DefaultLayout"
import ProfileLayout from "./components/layouts/ProfileLayout"
import Login from "./views/Login"
import Signup from "./views/Signup"
import Home from "./views/Home"
import User from "./views/User"
import Blogs from "./views/Blogs"
import BlogCreating from "./views/forms/BlogCreating"
import PostCreating from "./views/forms/PostCreating"
// Profile
import ProfilePosts from "./views/profile/ProfilePosts"
import ProfileOptions from "./views/profile/ProfileOptions"
import ProfileBlogs from "./views/profile/ProfileBlogs"

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/users',
                element: <User />
            },
            {
                path: '/profile',
                element: <ProfileLayout />,
                children: [
                    {
                        path: '/profile',
                        element: <ProfilePosts/>
                    },
                    {
                        path: '/profile/blogs',
                        element: <ProfileBlogs/>
                    },
                    {
                        path: '/profile/options',
                        element: <ProfileOptions/>
                    },
                ]
            },
            {
                path: '/post/creating',
                element: <PostCreating />
            },
            {
                path: '/blog/creating',
                element: <BlogCreating />
            },
            {
                path: '/blogs',
                element: <Blogs />
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            }
        ]
    }
])

export default router;