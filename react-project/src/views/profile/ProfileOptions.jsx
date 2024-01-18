import { useState, useEffect } from 'react'
import { useStateContext } from "../../contexts/ContextProvider"
import { Link } from 'react-router-dom'
import axiosClient from '../../axios-client.js'
import ProfilePost from '../../components/profile/ProfilePost.jsx'
import Input from '../../components/interface/Input.jsx'
import InputTextarea from '../../components/interface/InputTextarea.jsx'
import Button from '../../components/interface/Button.jsx'
import Upload from '../../components/interface/Upload.jsx'

export default function ProfileOptions() {
    const {user, setAlertMessage, setUser} = useStateContext();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [email, setEmail] = useState('');
    const [tag, setTag] = useState('');
    const [image, setImage] = useState({});
    const [imagePreview, setImagePreview] = useState('');
    const [errors, setErrors] = useState({});

    const handleName = (e) => setName(e.target.value); 
    const handleDescriptor = (e) => setDescription(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);
    const handleTag = (e) => setTag(e.target.value);

    const handleImageUpload = (e) => {
        setImage(e.target.files[0]);
        setImagePreview(URL.createObjectURL(e.target.files[0]));
    }

    const clearImagePreview = (e) => {
        e.stopPropagation();
        setImage('');
        setImagePreview(null);
    }

    useEffect(() => {
        axiosClient
            .get('/user/show/' + user._id)
            .then(({data}) => {
                const options = data.data;
                setName(options.name);
                setDescription(options.description);
                setEmail(options.email);
                setTag(options.tag);
                setImage(options.image);
                setImagePreview(options.image);
            })
            .catch((error) => {
                const response = error.response;
                if(response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    }, []);

    
    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('_method', 'patch');
        formData.append('name', name ?? '');
        formData.append('description', description ?? '');
        formData.append('email', email ?? '');
        formData.append('tag', tag ?? '');
        formData.append('image', image ?? '');
        
        axiosClient
            .post('/user/update/' + user._id, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",              
                },
            })
            .then(({data}) => {
                console.log(data.data);
                setAlertMessage('Настройки успешно сохранены!');
                setUser(data.data);
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
        <form onSubmit={submit}>
            <div className="space-y-8 py-16 w-full">
                <div className="w-full flex">
                    <div className="w-1/5"></div>
                    <div className="w-4/5">
                        <div className="text-3xl font-bolder">Настройки</div>
                        <div className="text-lg text-gray-400">Данные вашего профиля</div>
                    </div>
                </div>

                <Input width="w-full" label="Логин" state={name} handleState={handleName} error={errors.name}/>
                <InputTextarea width="w-full" label="Расскажи о себе" state={description} handleState={handleDescriptor} error={errors.description}/>
                <Input width="w-full" label="Адрес почты" state={email} handleState={handleEmail} error={errors.email}/>
                <Input width="w-full" label="Твой тег" state={tag} handleState={handleTag} error={errors.tag}/>
                <Upload handle={handleImageUpload} preview={imagePreview} clear={clearImagePreview} label="Изображение дескриптора"/>

                <Button label="Сохранить" width="w-1/4" _class="ml-auto block"/>
            </div>
        </form>
    )
}
