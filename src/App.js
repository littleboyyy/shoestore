import './App.css';
import React from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Home from './pages/Home'
import Products from './pages/Products';
import Admin from './pages/Admin'
import Manage from './pages/Manage'
import Payment from './pages/Payment';


import 'bootstrap/dist/css/bootstrap.min.css';



function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/home' element={<Home />} />
      <Route path='/products' element={<Products />} />
      <Route path='/payment' element={<Payment />} />
      <Route path='*' element={<Navigate to='/' />} />



      {
        (localStorage.getItem('isValidate') === 'true') ?
          <Route path='/admin' element={<Navigate to='/admin/manage' replace />} />
          :
          <Route path='/admin' element={<Admin />} />
      }


      {
        !localStorage.getItem('isValidate') || localStorage.getItem('isValidate') === 'false' ?
          <Route path='/admin/manage' element={<Navigate to='/admin' replace />} />
          :
          <Route path='/admin/manage' element={<Manage />} />
      }
      {/* {
        localStorage.getItem('isValidate') === 'true' &&
     
      } */}

    </Routes>
  )
}

export default App;
