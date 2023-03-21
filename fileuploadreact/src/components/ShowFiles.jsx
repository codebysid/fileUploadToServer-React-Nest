import React, { useState } from 'react'

const ShowFiles = ({allFiles}) => {
    const[showFilesData,setShwoFilesData]=useState(false)

  return (
    <div 
    className='
    flex
    flex-col
    justify-center
    items-center
    gap-2
    '
    >
      <button
        onClick={()=>setShwoFilesData(true)}
        type="button"
        className='
        customBtn
        '
        >
          Show Files
        </button>
      <div
      className='
      flex
      flex-row
      gap-4
      w-9/12
      flex-wrap
      '
      >
        {
          showFilesData?allFiles.map((ele,key)=>{
            return(
              <div
              key={key}>
                <img 
                className='
                max-w-md
                max-h-44
             
                '
                src={`http://localhost:3000/${ele.pathToImage.replace("upload/","")}`}/>
                <span>Uploaded By : {ele.userName}</span>
              </div>
            )
          }):null
        }
        </div>
    </div>
  )
}

export default ShowFiles
