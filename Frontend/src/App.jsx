import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import CreateBlog from './pages/CreateBlog'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Blogs from './pages/Blogs'
import SingleBlog from './pages/SingleBlog'
import MyBlogs from './pages/MyBlogs'
import EditBlog from './pages/EditBlog'
import Footer from './components/Footer'


const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path="/blogs/:id" element={<SingleBlog />} />

        <Route path='/create-blogs' element={
          <ProtectedRoute>
            <CreateBlog />
          </ProtectedRoute>}
        />

        <Route path='/my-blogs' element={
          <ProtectedRoute>
            <MyBlogs />
          </ProtectedRoute>}
        />

        <Route path='/blogs/edit/:id' element={
          <ProtectedRoute>
            <EditBlog />
          </ProtectedRoute>}
        />
      </Routes>

      <Footer />
    </>

  )
}

export default App
