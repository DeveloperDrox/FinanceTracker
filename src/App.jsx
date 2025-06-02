import FloatingCircle from './Components/FloatingCircle'
import {Routes,Route} from "react-router-dom"
import Home from './pages/Home'
import Signup from './pages/Signup'
import { useContext } from 'react'
import { UserContext } from './store/LoginContext'
import { useEffect } from 'react'
import Login from './pages/Login'
import Verify from './pages/Verify'
import TransitionForm from './pages/TransitionForm'
import TransitionDetail from './pages/TransitionDetail'
import Setting from './pages/Setting'
import ItemsDetail from './pages/ItemsDetail'
import EditTransition from './pages/EditTransition'
import Category from './pages/Category'

function App() {
 const {getProfile,user}=  useContext(UserContext)

 useEffect(()=>{
  getProfile()
 },[user])
  
  return (
      <div className='h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 relative flex overflow-hidden '>
        <FloatingCircle size={" w-40 h-40"} left={"10"} top={"11"}/>
        <FloatingCircle size={" w-30 h-30"} left={"30"} top={"49"}/>
        <FloatingCircle size={" w-50 h-50"} left={"60"} top={"60"}/>


        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/addtransition' element={<TransitionForm/>}/>
          <Route path='/transition' element={<TransitionDetail/>}/>
          <Route path='/category' element={<Category/>}/>
          <Route path='/setting' element={<Setting/>}/>
          <Route path='/transition/:id/edit' element={<EditTransition/>}/>
          <Route path='/transition/:item/:itemName' element={<ItemsDetail/>}/>







          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/verify' element={<Verify/>}/>
  
        

        </Routes>




      </div>
  )
}

export default App
