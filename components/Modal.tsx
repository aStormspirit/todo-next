import React,{useState} from 'react'
import { useForm } from "react-hook-form";
import {useRouter} from 'next/router'

const Modal = ({open, closeModal, postId}) => {
    const { register, handleSubmit, reset } = useForm();
    const [FormData, setFormData] = useState('');
    const router = useRouter()

    const refreshData = () => {
      router.replace(router.asPath)
    }
    console.log(postId)


    async function update(id, data: FormDataType) {
        try{
          fetch(`http://localhost:3000/api/notes/${id}`,{
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json"
            },
            method: 'PATCH'
              }).then(()=> {
                reset()
                refreshData()
                closeModal()
              })
        }catch(err){
          console.log(err)
        }
      }
    
  const handleSub = async (id: string,data: FormDataType) => {
    try{
      update(id,data)
    }catch(err){
      console.log(err)
    }
  }

    
  const onSubmit = async (data: FormDataType) => {
    setFormData(data)
    handleSub(postId, data)
  }

    if(!open) return null
    else{
    return (
        <>
        <div className='fixed inset-0 z-10 bg-zinc-500/75'></div>
        <div className='fixed right-0 left-0 bottom-0 top-1/4 z-10'>
        <form onSubmit={handleSubmit(onSubmit)} className='w-auto min-w[25%] max-w-min mx-auto space-y-6 flex flex-col items-strech bg-yellow-400 p-10 rounded'>
            <button className='border-2 rounded bg-red-700 w-25' onClick={closeModal}>x</button>
            <h2 className='text-center font-bold text-xl'>Обновит задачу</h2>
            <input {...register("title")} type="text" placeholder='Заголовок' className='border-2 rounded border-gray-600 p-1' /> 
            <textarea {...register("content")} placeholder='Контент' className='border-2 rounded border-gray-600 p-1'></textarea>
            <button className='border-2 rounded bg-green-400 hover:bg-green-600 border-blue-700' type='submit'>Обновить</button>
        </form>
        </div>
        </>
        )
    }
}

export default Modal