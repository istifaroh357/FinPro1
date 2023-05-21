
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// import Pages
import Home from './Pages/Home'
import Promo from './Pages/Promo'
import PhotosSharing from './Pages/PhotosSharing'
import Blog from './Pages/Blog'
import User from './Pages/User'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/photos-sharing' element={<PhotosSharing /> } />
        <Route path='/promo' element={<Promo />} />
        <Route path='/blog' element={<Blog />} /> 
        <Route path='/user' element={<User />} /> 
      </Routes>
    </Router>
  )
}


export default App

