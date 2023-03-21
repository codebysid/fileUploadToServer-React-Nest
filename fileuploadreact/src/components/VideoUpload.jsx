import React, { useEffect, useState } from 'react'
import ShowVideos from './ShowVideos'

let formData=undefined
const VideoUpload = () => {
    const [file,setFile]=useState([])
    const [videoUrl,setVideourl]=useState([])
    const [username,setUsername]=useState('')
    const [msg,setMsg]=useState({msg:"",toShow:false})

    const videoUploadToServer=async(e)=>{
        e.preventDefault()
        formData.append('userName',username)

        const res=await fetch('http://localhost:3000/photos/video',{
            method:"POST",
            body:formData
        })

        const data=await res.json()
        if(data.msg==="Video Uploaded"){
            setMsg({
                msg:"Video Uploaded 👍🏻",toShow:true
            })
            setTimeout(()=>{
                setMsg({
                    msg:"",toShow:false
                })
                setVideourl([])
                setFile([])
            },3000)
        }

    }

    useEffect(()=>{
        formData=new FormData()
        file && file.map(ele=>{
            formData.append('video',ele)
            const url=URL.createObjectURL(ele)
            setVideourl(prev=>prev?[...prev,url]:[url])
        })
    },[file])
  return (
    <div 
    className=' flex m-10 flex-col'>
      <form 
      onSubmit={videoUploadToServer}
      className='flex flex-col justify-center items-center gap-10 w-full'>

        <input 
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
        type="text" 
        className='text-black outline-none p-4 rounded-md'
        required
        />

        <label
          className="
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
        "
        >
          <span>Click to Select Video</span>
          <input
            className="
          hidden
          "
            type="file"
            multiple
            accept="video/*"
            name=""
            id="file"
            onChange={(e) => {
              setFile(Array.from(e.target.files));
            }}
          />
        </label>

        {
            msg.toShow && <span>{msg.msg}</span>
        }

        <button 
        className='customBtn'
        type="submit">Upload Video</button>

        <ShowVideos/>        


      </form>
      <div 
      className='flex justify-center items-center gap-6 flex-row flex-wrap m-10'
      >
        {
            videoUrl?videoUrl.map((ele,key)=>{
                return (
                    <video 
                    key={key}
                    className='h-52 w-52 border border-white'
                    src={ele} controls></video>
                )
            }):null
        }
      </div>
    </div>
  )
}

export default VideoUpload
