import { useState, useEffect } from 'react'
import { useStateContext } from "../../contexts/ContextProvider"
import { Link } from 'react-router-dom'
import axiosClient from '../../axios-client.js'
import { Input } from '../../components/interface/Inputs.jsx'
import { Button } from '../../components/interface/Buttons.jsx'
import Upload from '../../components/interface/Upload.jsx'

export default function ProfileBlogs() {
    const {user} = useStateContext();

    useEffect(() => {
        axiosClient
            .get('/blogs?authorId=' + user._id)
            .then(({data}) => {
                console.log(data);
            })
            .catch((error) => {
                const response = error.response;
                console.log(error);
            });
    }, []);

    return (
        <></>
    )
}
