import { useState } from 'react'
import { Link } from 'react-router-dom'
import Wallpaper from '../../components/Wallpaper.jsx'
import Button from '../../components/interface/Button.jsx'
import axiosClient from '../../axios-client.js'
import { Navigate } from "react-router-dom"
import { Input } from '../../components/interface/Inputs.jsx'
import UploadImage from '../../components/interface/UploadImage.jsx'

export default function PostCreating(props) {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [errors, setErrors] = useState({});

    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');

    const handleImageUpload = (e) => {
        setImage(e.target.files[0]);
        setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
    
    const clearImagePreview = (e) => {
        e.stopPropagation();
        setImage('');
        setImagePreview(null);
    }

    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("title", title);
        formData.append("text", text);
        formData.append("image", image);

        axiosClient
            .post('/posts', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",              
                },
            })
            .then(({data}) => {
                window.location = "/profile";
            })
            .catch((error) => {
                const response = error.response;
                if(response && response.status === 422) {
                    setErrors(response.data.errors);
                    console.log(response.data.errors);
                }
            })
    }

    return (
        <div>
            <Wallpaper/>
            <main className="container w-9/12 mx-auto text-white bg-tile my-20">
                <form onSubmit={submit}>
                    <div className="p-10 w-full text-lg space-y-8 flex flex-col">
                        <div className="flex">
                            <div>
                                <div className="text-3xl font-bolder">Новая публикация</div>
                                <div className="text-lg text-gray-400">Заполните данные формы, что бы опубликовать новую запись</div>
                            </div>

                            <Button label="опубликовать" width="w-1/4" _class="ml-auto"/>
                        </div>

                        <Input width="w-full" label="Заголовок" handle={setTitle} value={title} error={errors.title}/>
                        <Input width="w-full" label="Содержание" handle={setText} value={text} error={errors.text} type="textarea"/>
                        
                        <UploadImage handle={handleImageUpload} preview={imagePreview} clear={clearImagePreview} width="w-1/3"/>
                    </div>
                </form>
            </main>
        </div>
    )
}