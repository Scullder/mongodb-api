'use client'

import { useState } from 'react'
import { Button, ButtonUpload, Input, Label } from '@/components/ui/UI'
import { useStateContext } from '@/contexts/ContextProvider'
import * as Post from '@/lib/models/Post'
import { MdDelete } from "react-icons/md"

export default function PostCreating(props) {
  const post = props.post

  const { setLoading, setAlertMessage } = useStateContext()

  const [title, setTitle] = useState(post.title ?? '')
  const [text, setText] = useState(post.text)
  const [errors, setErrors] = useState({})
  const [files, setFiles] = useState(post.images)
  const [filePreviews, setFilePreviews] = useState(post.images)

  const handleImageUpload = (loadedFiles) => {
    const uploadedFilePreviews = []
    setFiles([...files, ...loadedFiles])
    
    for (let index in loadedFiles) {
      if (loadedFiles[index] instanceof File) {
        uploadedFilePreviews.push(URL.createObjectURL(loadedFiles[index]))
      }
    }

    setFilePreviews([...filePreviews, ...uploadedFilePreviews])
  }
  
  const clearImagePreview = (e, index) => {
    e.stopPropagation()
    setFiles(files.toSpliced(index, 1))
    setFilePreviews(filePreviews.toSpliced(index, 1))
  }

  const submit = (e) => {
    e.preventDefault()
    setErrors({})
    setLoading(true)

    const payload = {
      id: post.id,
      title: title,
      text: text,
      images: files,
    }

    Post.update(post.id, payload, (res) => {
      setLoading(false)
      props.updatePost(props.index, res.data)
      props.closeModal()

      setAlertMessage({
        title: 'Готово.',
        text: 'Пост успешно отредактирован.',
        status: 'success',
      })
    }, (errors) => {
      setErrors(errors)
      setLoading(false)
    })
  }

  const deletePost = () => {
    setLoading(true)

    Post.destroy(post.id, (res) => {
      setLoading(false)

      props.removePost(props.index)
      props.closeModal()

      setAlertMessage({
        title: 'Готово.',
        text: 'Пост успешно удалён.',
        status: 'success',
      })
    })
  }

  return (
    <div className="w-[700px] space-y-3 flex flex-col">
      <Label help="заполните данные формы, что бы отредактировать запись" button={<button onClick={deletePost} className="text-xl rounded p-2 bg-rose-900 flex items-center justify-center hover:opacity-80"><MdDelete /></button>}>Редактирование публикации</Label>
      <Input width="w-full" label="Заголовок" placeholder="Заголовок" handle={setTitle} error={errors.title}>{title}</Input>
      <Input width="w-full" label="Текст" placeholder="Текст" handle={setText} error={errors.text} type="textarea">{text}</Input>
      <ButtonUpload handle={handleImageUpload} error={errors.images} previews={filePreviews} clear={clearImagePreview}/>
      <Button onClick={submit} _class="ml-auto" type="submit">опубликовать</Button>
    </div>
  )
}