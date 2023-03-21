import React, { useState } from 'react'

const ShowVideos = () => {

    const [videosData,setVideosData]=useState([])

    const fetchVideos=async()=>{
        const res=await fetch('http://localhost:3000/photos/fetchVideos',{
            method:"POST",
            headers:{
                'Content-Type':"application/json"
            }
        })

        const data=await res.json()
        setVideosData(data.imageData)
    }
  return (
    <div className='flex justify-center items-center flex-col'>
      <button 
      type='button'
      onClick={()=>fetchVideos()}
      className='customBtn'>
        Show Videos
      </button>

    <div className='flex flex-row justify-center items-center flex-wrap gap-10 m-4'>
        {
            videosData && videosData.map((ele,key)=>{
                return(
                    <div className='flex flex-col'>
                    <video
                    className='h-52 w-52 border border-white'
                    key={key} src={`http://localhost:3000/${ele.pathToVideo.replace("upload/","")}`}
                    controls
                    ></video>
                    <span>Uploaded By:{ele.userName}</span>
                    </div>
                )
            })
        }
    </div>

    </div>
  )
}

export default ShowVideos
