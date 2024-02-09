'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStateContext } from '@/contexts/ContextProvider.jsx'
import axiosClient from '@/axios-client.js'
import * as UI from '@/components/ui/UI'
import { MdEmail } from "react-icons/md"
import { IoIosLock } from "react-icons/io"
import Link from 'next/link'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const {setUser, setToken, setLoading, setAlertMessage} = useStateContext();

  const router = useRouter();

  const submit = (e) => {
    e.preventDefault()
    setLoading(true)

    const payload = {
      email: email,
      password: password,
    }

    axiosClient.post('/user/login', payload)
      .then(({data}) => {
        //console.log(data)
        setLoading(false)
        setToken(data.token)
        setUser(data.user)
        router.push(`/profile/${data.user.id}`);
      })
      .catch((error) =>{
        const response = error.response
        
        if(response && response.status === 422) {
          setErrors(response.data.errors)
        } else if (response && response.status === 400) {
          setAlertMessage({
            title: 'Не удачная попытка авторизации!',
            text: 'Не правильная почта или пароль!',
            status: 'warning',
          })
        }

        setLoading(false)
      })
  }

  //  TODO: create one component for login and signup
  return (
    <div className="container w-9/12 mx-auto text-white">
      <div className="relative w-2/6 min-h-[100px] mx-auto mt-16 bg-tile p-8 rounded">
        <div className="flex mb-[50px] font-semibold">
          <Link href="/signup" className="flex-1 w-full text-center p-2 border-b-2 text-input border-input">Signup</Link>
          <Link href="/login" className="flex-1 w-full text-center p-2 border-b-4 ">Login</Link>
        </div>
        <form onSubmit={submit} className="space-y-6 text-sm">
          <UI.InputInline handle={setEmail}    value={email}    error={errors.email} placeholder="email"><MdEmail/></UI.InputInline>
          <UI.InputInline handle={setPassword} value={password} error={errors.password} placeholder="пароль" pass={true}><IoIosLock /></UI.InputInline>
          <div className="pt-4">
            <UI.Button _class="mx-auto w-full" type="submit" color="bg-secondary">готово</UI.Button>
          </div>
        </form>
      </div>
    </div>
  )
}