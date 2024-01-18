import { useState, useRef } from 'react'
import { useStateContext } from "../../contexts/ContextProvider"
import axiosClient from '../../axios-client.js'
import Wallpaper from '../../components/Wallpaper.jsx'
// HTML editor
import SunEditor, { buttonList } from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'
import {align, font, fontSize, fontColor, hiliteColor, horizontalRule, image, template, video} from 'suneditor/src/plugins'
import UploadImage from '../../components/interface/UploadImage.jsx'
import { Input } from '../../components/interface/Inputs.jsx'
import { Button } from '../../components/interface/Buttons.jsx'


export default function BlogCreating(props) {
    const {user} = useStateContext();
    
    const [image, setImage] = useState({});
    const [imagePreview, setImagePreview] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState({});
    const [isPublic, setIsPublic] = useState(false);

    const handleContent = (e) => {
        setContent(e);
    } 

    const handleImageUpload = (e) => {
        setImage(e.target.files[0]);
        setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
    
    const clearImagePreview = (e) => {
        e.stopPropagation();
        setImage('');
        setImagePreview(null);
    }

    const handleIsPublic = () => {
        setIsPublic(!isPublic);
    };

    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('author_id', user._id);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('content', content);
        formData.append('image', image);
        formData.append('is_public', isPublic);

        axiosClient
            .post('/blogs', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",              
                },
            })
            .then(({data}) => {
                console.log('success');
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
            <Wallpaper src={imagePreview}/>

            <main className="container w-9/12 mx-auto text-gray-200 bg-tile my-44 relative z-30 p-10 rounded">
                <form onSubmit={submit} className="space-y-8">
                    <div className="border-b-2 border-gray-600 pb-8">
                        <div className="flex">
                            <div>
                                <div className="text-3xl font-bolder">Создание блога</div>
                                <div className="text-md text-gray-400">Здесь вы можете создать свой следующий шедевр</div>
                            </div>
                            <div className="ml-auto space-x-2">
                                <Button width="w-40" color="bg-orange">сохранить</Button>
                                
                            </div>
                        </div>
                    </div>
                    <div className="my-8">
                        <input type="checkbox" checked={isPublic} onChange={handleIsPublic} className="w-4 h-4 accent-orange"/>
                        <label className="text-gray-400 inline ml-2">Публичный просмотр (в дальнейшем можно изменить)</label>
                    </div>
                    <div>
                        <div className="text-gray-400 block mb-2">Титульное изображение (preview)</div>
                        <UploadImage handle={handleImageUpload} preview={imagePreview} clear={clearImagePreview} width="w-full"/>
                    </div>

                    <Input label="Придумайте название" handle={setTitle} value={title} error={errors.title}/>
                    <Input label="Добавьте описание" handle={setDescription} value={description} type="textarea" error={errors.description}/>
                    
                    <div>
                        <div className="text-gray-400 block mb-2">Содержание вашей публикации</div>
                        <SunEditor 
                            setOptions={{
                                buttonList: [
                                    ['undo', 'redo', 'removeFormat'],
                                    ['align', /* 'font', 'fontSize', */ 'fontColor', 'hiliteColor', 'formatBlock'],
                                    ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                                    ['image'],
                                    ['video'],
                                ],
                            }}
                            onChange={(content) => {console.log(content)}} 
                            width="100%" 
                            height="1000px"
                            setDefaultStyle="font-family: Arial, sans-serif; font-size: 18px;" 
                        />
                    </div>
                </form>
            </main>
        </div>
    )
}