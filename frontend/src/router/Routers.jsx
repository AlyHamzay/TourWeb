import React from 'react'
import {Routes,Route,Navigate} from 'react-router-dom'
import Home from './../pages/Home';
import Register from './../pages/Register';
import Tours from './../pages/Tours';
import SearchResultList from './../pages/SearchResultList';
import TourDetails from '../pages/TourDetails';
import ThankYou from '../pages/ThankYou';
import Login from '../pages/Login';

const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/Home'/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/tour' element={<Tours/>}/>
      <Route path='/tour/:id' element={<TourDetails/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/thank-you' element={<ThankYou/>}/>
      <Route path='/tours/search' element={<SearchResultList />} />

    </Routes>
  )
}

export default Routers
