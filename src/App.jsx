import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import User from './pages/User'
import Dashboard from './pages/Dashboard'
import Manage from './pages/Manage'
import Header from './components/Header'
import Footer from './components/Footer'


function App() {

  return (
    <>
    <Header/>
      <Routes>
        <Route path='/' element={<Home />}> </Route>
        <Route path='/login' element={<Login />}> </Route>
        <Route path='/user' element={<User />}> </Route>
        <Route path='/admin' element={<Dashboard />}> </Route>
        <Route path='/add' element={<Manage />}> </Route>
        <Route path='/:id/edit' element={<Manage />} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App
