import { useState, useEffect } from 'react'
import { useStateContext } from "../../contexts/ContextProvider.jsx"
import { Link } from 'react-router-dom'
import Button from '../interface/Button.jsx'
import { HiUser } from 'react-icons/hi'
import { RiUserFollowFill, RiUserSharedFill } from 'react-icons/ri'
import { TbArticle } from 'react-icons/tb'

export default function ProfileDescriptor(props) {
    const data = props.data

    return (
        <section id="descriptor" className="mx-auto flex text-xl gap-4 bg-body/90 p-6 rounded">
            <div className="w-3/12 -mt-24">
                { data.image 
                    ? <img src={data.image} className="w-full rounded drop-shadow" />
                    : <div className="w-full rounded drop-shadow flex h-[300px] bg-gray-300 text-tileLighter justify-center items-center text-7xl"><HiUser /></div>
                }
                <Button width="w-full" _class="mx-auto mt-4" label="subscribe"/>
            </div>

            <div className="w-9/12 relative">
                <div className="flex items-end mb-8">
                    <h1 className="text-4xl font-bold">{data.name}</h1>
                    {/* <h2 className="text-3xl text-red ml-4">
                        <label className="flex items-end"><i className="ri-arrow-up-fill"></i>{data.level} lv.</label>
                    </h2> */}
                    <h2 className="text-2xl text-green ml-auto">{data.tag}</h2>
                </div>
                
                <div className="max-h-3/5 overflow-auto">{data.description}</div>

                <div className="w-full absolute bottom-0">
                    <div className="flex gap-14 text-2xl text-gray-200 justify-center items-center p-4">
                        { data.followersCount && <span className="flex justify-center items-center gap-2"><RiUserFollowFill /> {data.followersCount} followers</span> }
                        { data.followersCount && <span className="flex justify-center items-center gap-2"><RiUserSharedFill /> {data.followingCount} following</span> }
                        { data.followersCount && <span className="flex justify-center items-center gap-2"><TbArticle /> {data.publicationsCount} publications</span> }
                    </div>
                </div>    
            </div>
        </section>
    )
}
