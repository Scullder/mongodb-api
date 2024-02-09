'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Input, ButtonUpload, Label, Switch } from '@/components/ui/UI'
import { useStateContext } from '@/contexts/ContextProvider'
import Wallpaper from '@/components/Wallpaper.jsx'
import CKECustom from '@/components/ckeditor/ckecustom'
import * as Blog from '@/lib/models/Blog'

export default function Page({params}) {
  const { user, setLoading, setAlertMessage } = useStateContext();

  const [image, setImage] = useState({});
  const [imagePreview, setImagePreview] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [errors, setErrors] = useState({});

  const router = useRouter();

  useEffect(() => {
    if (params.id === undefined) {
      return
    }

    Blog.get(params.id, (res) => {
      const blog = res.data

      setImage(blog.image)
      setImagePreview(blog.image)
      setTitle(blog.title)
      setContent(blog.content ?? '')
      setIsPublic(blog.is_public)

      if (blog.description) {
        setDescription(blog.description)
      }
    })
  }, [])

  const submit = (e) => {
    e.preventDefault()

    setLoading(true)
    setErrors({})

    let blog = {
      authorId: user.id,
      title: title,
      description: description,
      content: content,
      isPublic: isPublic,
      image: image ?? '',
    }

    // Store
    if (params.id === undefined) {
      Blog.create(blog, (res) => {
        router.push(`/blog/edit/${res.data.id}`);
        setLoading(false)
      }, (errors) => {
        setErrors(errors)
        setLoading(false)
      })

      return
    }
    
    // Update
    Blog.update(params.id, blog, (data) => {
      setAlertMessage({
        title: 'Успех!',
        text: 'Блог успешно обновлён',
        status: 'success',
      })
      setLoading(false)
    }, (errors) => {
      setErrors(errors)
      setLoading(false)
    })
  }

  const handleImageUpload = (files) => {
    setImage(files[0])
    setImagePreview(URL.createObjectURL(files[0]))
  }

  const clearImagePreview = (e) => {
    e.stopPropagation()
    setImage('')
    setImagePreview(null)
  }

  const handleIsPublic = () => {
    setIsPublic(!isPublic)
  };

  const remove = () => {
    setLoading(true)

    if (params.id === undefined) {
      return;
    }

    Blog.destroy(params.id, () => {
      router.push("/blog/edit");
      setLoading(false)
    })
  }

  return (
    <div>
      <Wallpaper src={imagePreview} />
      <main className="container w-9/12 mx-auto text-gray-200 bg-background my-44 relative z-30 p-10 rounded">
        <form onSubmit={submit} className="space-y-8">
          <Label 
            button={
              <div className="flex gap-2">
                {params.id && <Button width="w-40" color="bg-gray-700" onClick={remove}>Удалить</Button>}
                <Button width="w-40" color="bg-primary" type="submit">сохранить</Button>
              </div>
            }
            help="здесь вы можете создать свой следующий шедевр">Создание блога</Label>
          <Switch checked={isPublic} onChange={handleIsPublic}/>
          <div>
            <ButtonUpload handle={handleImageUpload} error={errors.image} clear={clearImagePreview} previews={imagePreview} single={true}>Титульное изображение</ButtonUpload>
          </div>
          <Input width="w-full" label="Придумайте название" placeholder="Название" handle={setTitle} error={errors.title}>{title}</Input>
          <Input width="w-full" label="Добавьте описание" placeholder="Описание" handle={setDescription} error={errors.description} type="textarea">{description}</Input>
          <div className="text-white">
            <div className="text-gray-400 block mb-2">Содержание вашей публикации</div>
            <div>
              <CKECustom 
                content={content}
                handler={(e, editor) => {
                  setContent(editor.getData())
              }}/>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}
