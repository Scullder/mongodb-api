import { useState } from 'react'
import { useStateContext } from '../contexts/ContextProvider.jsx'
import axiosClient from '../axios-client.js'

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const {setUser, setToken} = useStateContext();

    const submit = (e) => {
        e.preventDefault();

        const payload = {
            email: email,
            password: password,
        }
        axiosClient.post('/user/login', payload)
            .then(({data}) => {
                setToken(data.token);
                setUser(data.user);
            })
            .catch((error) =>{
                const response = error.response;
                if(response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            })

    }

    const inputClass = 'w-full p-2 m-0 outline-none border-b border-gray-600 rounded-sm bg-tile/50 text-center focus:border-white focus:text-white';
    const errorClass = 'text-sm text-rose-600 w-full text-center mt-2';

    return (
        <div className="bg-tile/60 w-[25%] mx-auto mt-[100px]">
            <form onSubmit={submit}>
                <h1 className="text-2xl w-full bg-tile/80 p-6">Login</h1>
                <div className="p-6 text-gray-400">
                    <div className="mb-5 relative">
                        <label className="text-sm">email</label>
                        <input className={`${inputClass}`} value={email} onChange={(e) => setEmail(e.target.value)} />
                        { errors.email && <div className={`${errorClass}`}>{errors.email}</div> }
                    </div>

                    <div className="mb-5 relative">
                        <label className="text-sm">password</label>
                        <input className={`${inputClass}`} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        { errors.password && <div className={`${errorClass}`}>{errors.password}</div> }
                    </div>

                    <button className="block w-full h-12 mt-8 mb-4 bg-green text-white" type="submit">Signup</button>                  
                </div>
            </form>
        </div>
    )
}