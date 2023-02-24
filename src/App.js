import './App.css';
import React from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Home from './pages/Home'
import Products from './pages/Products';
import Admin from './pages/Admin'
import Manage from './pages/Manage'
import Payment from './pages/Payment';
import SizePage from './pages/SizePage';
import Popup from './components/ProductPage/ProductDetail';


import 'bootstrap/dist/css/bootstrap.min.css';



function App() {

  return (
    <Routes>
      <Route path='/pop' element={<Popup />} />
      <Route path='*' element={<Navigate to='/' />} />
      <Route path='/' element={<Home />} />
      <Route path='/home' element={<Home />} />
      <Route path='/size-page' element={<SizePage />} />
      <Route path='/products' element={<Products />} />
      <Route path='/payment' element={<Payment />} />
      <Route path='/admin' element={<Admin />} />

      {
        (localStorage.getItem('isValidate') === null || localStorage.getItem('isValidate') === 'false') &&
        <Route path='/admin/manage' element={<Navigate to='/admin' replace />} />
      }

      <Route path='/admin/manage' element={<Manage />} />


    </Routes>
  )
}

export default App;
