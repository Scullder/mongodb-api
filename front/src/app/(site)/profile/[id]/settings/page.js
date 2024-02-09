'use client'

import { useStateContext } from '@/contexts/ContextProvider';
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import * as User from '@/lib/models/User'
import * as UI from '@/components/ui/UI'
import { FaTelegram, FaDiscord, FaInstagram } from "react-icons/fa";

export default function Page({params}) {
  const { user, setUser, token, setAlertMessage, setLoading } = useStateContext();

  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  const [backImage, setBackImage] = useState('');
  const [backImagePreview, setBackImagePreview] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [discord, setDiscord] = useState('');
  const [telegram, setTelegram] = useState('');
  const [instagram, setInstagram] = useState('');
  const [errors, setErrors] = useState({});

  const router = useRouter()

  useEffect(() => {
    setLoading(true)

    if (params.id === undefined || params.id !== user.id) {
      router.push(`/profile/${user.id}`)
    } 

    if (params.id === undefined) {
      return
    }

    User.get(user.id, (data) => {
      const userData = data.data

      setImage(userData.image)
      setImagePreview(userData.image)

      setBackImage(userData.backImage)
      setBackImagePreview(userData.backImage)

      setName(userData.name)
      setEmail(userData.email)
      setDiscord(userData.discord)
      setTelegram(userData.telegram)
      setInstagram(userData.instagram)
      setDescription(userData.description ?? '')

      setLoading(false)
    }, (errors) => {
      setLoading(false)
      console.log(errors)
    })
  }, [])

  const submit = (e) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})

    let userData = {
      user_id: user.id,
      name: name,
      description: description,
      email: email,
      discord: discord,
      telegram: telegram,
      instagram: instagram,
      image: image,
      backImage: backImage,
    }
    
    User.update(params.id, userData, (res) => {
      setUser(res.data)
      setAlertMessage({
        title: 'Success!',
        text: 'Profile was updated successfully!',
        status: 'success',
      })
      setLoading(false)
    }, (errors) => {
      setLoading(false)
      setErrors(errors)
    })
  }

  const handleImageUpload = (files) => {
    setImage(files[0])
    setImagePreview(URL.createObjectURL(files[0]))
  }

  const clearImage = (e) => {
    e.stopPropagation()
    setImage('')
    setImagePreview(null)
  }

  const handleBackImageUpload = (files) => {
    setBackImage(files[0])
    setBackImagePreview(URL.createObjectURL(files[0]))
  }

  const clearBackImage = (e) => {
    e.stopPropagation()
    setBackImage('')
    setBackImagePreview(null)
  }

  const renderSocial = (icon, social, color = '') => {
    return (
      <div className={`flex items-center ${color}`}>
        {icon}
        <label className="ml-2">{social}</label>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="space-y-4"> 
      <UI.Input width="w-full" label="Логин" handle={setName} error={errors.name} placeholder="Логин">{name}</UI.Input>
      <UI.Input width="w-full" label="Email" handle={setEmail} error={errors.email} placeholder="Email">{email}</UI.Input>
      <UI.Input width="w-full" label="Описание" handle={setDescription} error={errors.description} type="textarea" placeholder="Описание">{description}</UI.Input>
      <UI.ButtonUpload handle={handleImageUpload} error={errors.image} clear={clearImage} previews={imagePreview} single={true}>Изображение</UI.ButtonUpload>
      <UI.ButtonUpload handle={handleBackImageUpload} error={errors.back_image} clear={clearBackImage} previews={backImagePreview} single={true}>Фоновое изображение</UI.ButtonUpload>
      <UI.Input width="w-full" label={renderSocial(<FaDiscord />, 'Discord', 'text-zinc-200')} handle={setDiscord} error={errors.discord} placeholder="Discord">{discord}</UI.Input>
      <UI.Input width="w-full" label={renderSocial(<FaTelegram />, 'Telegram', 'text-sky-600')} handle={setTelegram} error={errors.telegram} placeholder="Telegram">{telegram}</UI.Input>
      <UI.Input width="w-full" label={renderSocial(<FaInstagram />, 'Instagram', 'text-fuchsia-600')} handle={setInstagram} error={errors.instagram} placeholder="Instagram">{instagram}</UI.Input>
      <UI.Button _class="ml-auto" type="submit">Сохранить</UI.Button>
    </form>
  )
}
