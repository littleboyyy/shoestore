import './App.css';
import React from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Home from './pages/Home'
import Products from './pages/Products';
import Admin from './pages/Admin'
import Manage from './pages/Manage'
import Payment from './pages/Payment';
import Order from './pages/Order';

import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  const navigate = useNavigate()

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/home' element={<Home />} />
      <Route path='/products' element={<Products />} />
      <Route path='/payment' element={<Payment />} />
      <Route path='/admin/order' element={<Order />} />


      {
        (localStorage.getItem('isValidate') != null && localStorage.getItem('isValidate') === 'true') ?
          <Route path='/admin' element={<Navigate to='/admin/manage' replace />} />
          :
          <Route path='/admin' element={<Admin />} />
      }


      {
        (localStorage.getItem('isValidate') != null && localStorage.getItem('isValidate') === 'true') ?
          <Route path='/admin/manage' element={<Manage />} /> :
          <Route path='/admin/manage' element={<Navigate to='/admin' replace />} />
      }

    </Routes>
  )
}

export default App;
