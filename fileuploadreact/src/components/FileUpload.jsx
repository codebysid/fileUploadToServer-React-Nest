import { data } from 'autoprefixer'
import React, { useState } from 'react'

const FileUpload = () => {
  const [file,setFile]=useState()
  const [msg,setMsg]=useState(false)

  const uploadFile=async(e)=>{
    e.preventDefault()

    if(!file) return

    const formData=new FormData()
    formData.append('photo',file)

    const res=await fetch('http://localhost:3000/photos/upload',{
      method:"POST",
      body:formData
    })

    const data=await res.json()

    if(data.msg==="File Uploaded"){
      setMsg(true)
      setTimeout(() => {
        setMsg(false)
      }, 3000);
    }else{
      setMsg(false)
    }
  }

  return (
    <div
    className='
    text-white
    h-screen
    flex
    justify-center
    items-center
    bg-zinc-900
    '
    >
      <form 
      className='
      flex
      flex-col
      justify-center
      items-centr
      gap-8
      '
      onSubmit={uploadFile}>

        <label
        className='
        border-2
        border-dashed
        border-blue-500
        p-10
        rounded-md
        flex
        justify-center
        items-center
        flex-col
        hover:cursor-pointer
        '
        >
          <span>Click to Select File</span>
          <input
          className='
          hidden
          '
          type="file" name="" id="file" onChange={(e)=>setFile(e.target.files[0])}/>

        {
          file?<span
          className='
           text-blue-500
           mt-6
           italic
          '
          >Selected File: {file.name}</span>:<span
          className='
           text-blue-500
           mt-6
           italic
          '
          >No File Selected</span>
        }
        </label>


        <button
        className='
        border
        border-blue-500
        p-2
        rounded-md
        hover:bg-blue-500
        transition-all
        duration-500
        ease-in-out
        flex 
        justify-center
        items-center
        gap-2
        '
        >
        📄 Upload File to Server</button>

      {
        msg?
        <span
        className='
        text-white
        text-center
        '
        >File Uploaded 👍🏻</span>:null
      }
      </form>
    </div>
  )
}

export default FileUpload
