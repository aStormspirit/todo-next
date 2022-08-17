import type { GetServerSideProps, NextPage } from 'next'
import { useState, useReducer } from 'react';
import { useForm } from "react-hook-form";
import Todolist from '../components/Todolist'
import { prisma } from '../lib/prisma'
import {useRouter} from 'next/router'
import Modal from '../components/Modal'

interface FormDataType {
  title: string,
  content: string
}


function reducer(state: any, action: any) {
  switch (action.type) {
    case 'open':
      return {open: !state.open, id: action.payload};
    case 'close':
      return {open: false, id: 0}
    default:
      throw new Error();
  }
}

const Home: NextPage = ({notes}: any) => {

  const [state, dispatch] = useReducer(reducer, {open: false, id: 0});

  const { register, handleSubmit, reset } = useForm();
  const [FormData, setFormData] = useState<FormDataType | "">('');
  const router = useRouter()

  const refreshData = () => {
    router.replace(router.asPath)
  }

  async function deleteNote(id: string) {
    try{
      fetch(`https://127.0.0.1:3000/api/notes/${id}`,{
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
        },
        method: 'DELETE'
          }).then(()=> {
            refreshData()
          })
    }catch(err){
      console.log(err)
    }    
  }
  
  async function create(data: FormDataType) {
    try{
      fetch('https://127.0.0.1:3000/api/create',{
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
        },
        method: 'POST'
          }).then(()=> {
            reset()
            refreshData()
          })
    }catch(err){
      console.log(err)
    }
  }


  const handleSub = async (data: FormDataType) => {
    try{
      create(data)
    }catch(err){
      console.log(err)
    }
  }

  const onSubmit = async (data: any) => {
    setFormData(data)
    handleSub(data)
  }

  function openModal(id: string){
    dispatch({type: 'open', payload: id})
  }

  function closeModal(){
    dispatch({type: 'close'})
  }

  return (
    <div className="grid grid-cols-5 grid-rows-3">
      <div className='col-span-2'>
        <Todolist notes={notes} deleteNote={deleteNote} openModal={openModal}/>
      </div>
      <div className='col-start-4 row-start-2'>
        <h1 className='text-center font-bold text-2xl mt-4'>Список дел</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='w-auto min-w[25%] max-w-min mx-auto space-y-6 flex flex-col items-strech bg-yellow-400 p-10 rounded'>
          <h2 className='text-center font-bold text-xl'>Добавить задачу</h2>
          <input {...register("title")} type="text" placeholder='Заголовок' className='border-2 rounded border-gray-600 p-1' /> 
          <textarea {...register("content")} placeholder='Контент' className='border-2 rounded border-gray-600 p-1'></textarea>
          <button className='border-2 rounded bg-green-400 hover:bg-green-600 border-blue-700' type='submit'>Добавить</button>
        </form>
        <Modal open={state.open} closeModal={closeModal} postId={state.id} />
      </div>
    </div>
  )
}

export default Home



export const getServerSideProps: GetServerSideProps = async () => {
  const notes = await prisma.note.findMany({
    select: {
      title: true,
      id: true,
      content: true
    }
  })

  return {
    props: {
      notes
    }
  }
}