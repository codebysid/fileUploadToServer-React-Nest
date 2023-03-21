import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import FileUpload from './components/FileUpload'
import {Routes , Route} from 'react-router-dom'
import VideoUpload from './components/VideoUpload'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' exact element={<FileUpload/>}/>
        <Route path='/videoUpload' element={<VideoUpload/>}/>
      </Routes>

    </div>
  )
}

export default App
