import { useState } from 'react'
import { useStateContext } from "../../contexts/ContextProvider"
import axiosClient from '../../axios-client.js'
import Button from '../interface/Button.jsx'
import ButtonRound from '../interface/ButtonRound.jsx'
import { BiCommentDetail } from 'react-icons/bi'
import { IoMdClose } from 'react-icons/io'
import { RiSendPlane2Fill, RiSendPlaneFill } from 'react-icons/ri'
import { BsFillArrowUpCircleFill } from 'react-icons/bs'

export default function ProfilePost(props) {
    const {user} = useStateContext();

    const post = props.post;
    
    const [isPostHover, setPostHover] = useState(false);
    const [isCommentsOpened, setCommentsOpened] = useState(false);
    const [comment, setComment] = useState('');
    const [errors, setErrors] = useState({});

    const handleCommentOpened = () => {
        setCommentsOpened(!isCommentsOpened);
    }
    
    const sendComment = (e) => {
        const payload = {
            author_id: user._id,
            post_id: post.id,
            text: comment,
        }

        axiosClient
            .post('/comments', payload)
            .then(({data}) => {
                setComment('');
            })
            .catch((error) => {
                const response = error.response;
                if(response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    }


    return (
        <div className="w-full flex flex-col">
            <div className="relative m-auto p-4 rounded w-full bg-tile" onMouseEnter={() => setPostHover(true)} onMouseLeave={() => setPostHover(false)}>
                <div className="flex items-center gap-2 mb-4">
                    <img src={post.author.image} className="w-[40px] h-[40px] rounded-full border border-gray-700" />
                    <label>{post.author.name}</label>
                    <label className="text-gray-500 ml-auto">{post.date}</label>
                </div>

                {post.title && <h2 className="text-xl font-medium">{post.title}</h2>}
                <p className="my-4">{post.text}</p>
                {post.images && <img src={`${post.images}`} className="m-auto bg-header min-w-[40%]" />}

                {isPostHover &&
                    <ButtonRound onCustomClick={handleCommentOpened} _class="absolute right-6 bottom-6">
                        <BiCommentDetail/>
                    </ButtonRound>
                }

                {isCommentsOpened &&
                    <div onClick={handleCommentOpened} className="absolute top-0 right-0 w-full h-full bg-black opacity-60"></div>
                }

                {isCommentsOpened &&
                    <div className="absolute top-0 left-0 w-3/4 h-full bg-tile p-2 pt-0 flex flex-col">
                        <div className="py-4 px-5">
                            <h2 className="text-2xl font-semibold">Comments ({post.comments.length})</h2>
                        </div>

                        <div className="bg-body w-full h-full flex-grow overflow-auto gap-3">
                            {post.comments.map(comment => (
                                <div className="bg-tileLighter p-3 rounded m-3" key={comment.id}>
                                    <div className="flex items-center gap-3">
                                        <img src={comment.author.image} className="w-[40px] h-[40px] rounded-full border border-gray-700" />
                                        <label className="font-bold">{comment.author.name}</label>
                                        <label className="text-gray-500 ml-auto">{comment.date}</label>
                                    </div>

                                    <p className="mt-1">{comment.text}</p>
                                </div>
                            ))}
                        </div>

                        <div className="pt-2 h-[140px] relative flex items-center">
                            {/* <input className="w-full  bg-body rounded outline-none p-2 resize-none" placeholder="Введите ваш комментарий..." /> */}
                            <textarea onChange={(e) => setComment(e.target.value)} value={comment} className="w-full h-full bg-body rounded outline-none p-2 resize-none" placeholder="Введите ваш комментарий..."></textarea>
                            <button onClick={sendComment} className="absolute right-3 text-green text-3xl bg-white p-4 rounded-lg"><BsFillArrowUpCircleFill /></button>
                        </div>
                    </div>
                }                
            </div>
        </div>
    )
}