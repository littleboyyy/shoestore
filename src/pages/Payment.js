import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../style/payment.css'

const checkmarkImg = require('../static/img/green-checkmark-icon.png')

function Payment() {
    const cartFromSession = JSON.parse(sessionStorage.getItem('cartItems'))
    const navigator = useNavigate()
    const [isPaid, setIsPaid] = useState(0)
    const notifyPaid = () => {
        toast.success('You have ordered!', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    const postOrder = () => {
        var cus_name = document.getElementById('customer-name').value
        var cus_number = document.getElementById('customer-number').value
        var cus_address = document.getElementById('customer-address').value
        var cus_email = document.getElementById('customer-email').value
        let orderInfo = new FormData()
        let today = new Date().toISOString().slice(0, 10)
        const or_detail = []

        //add to formdata
        orderInfo.append('cus_name', cus_name)
        orderInfo.append('phone', cus_number)
        orderInfo.append('email', cus_email)
        orderInfo.append('address', cus_address)

        cartFromSession.forEach(item => {
            or_detail.push(item.shoeID)
            or_detail.push(item.size)
            or_detail.push(item.itemQuantity)
        }
        )
        orderInfo.append('or_detail', JSON.stringify(or_detail))
        orderInfo.append('orDate', today)
        orderInfo.append('money', sessionStorage.getItem('totalCost'))

        axios.post('http://localhost:3000/server/add_order.php', orderInfo)
            .then(
                (data) => console(data)
            )
            .catch(() => console.error('Error to Post to API!'))
        notifyPaid()
        // setTimeout(() => {
        //     navigator('/')
        // }, 2000)
        setIsPaid(1)
        // window.parent.location = window.parent.location.href
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        postOrder()
        sessionStorage.clear()
    }

    return (
        <div className="payment-page">
            {
                console.log(isPaid)
            }
            {
                isPaid ?
                    <div style={{ textAlign: 'center' }}>
                        <p><img src={checkmarkImg} alt="" style={{ width: '10%', height: '50%' }} /></p>
                        <p>Your order has been recieved!</p>
                        <a href="/products">
                            <Button variant="primary">Continue Shopping</Button>
                        </a>
                    </div>
                    :
                    <form onSubmit={handleSubmit}>
                        <h2>Customer Information</h2>
                        <div className="form-row">
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                id='customer-name'
                                required
                            />
                        </div>
                        <div className="form-row">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                id='customer-email'
                                required
                            />
                        </div>
                        <div className="form-row">
                            <label>Address</label>
                            <input
                                type="text"
                                name="address"
                                id='customer-address'
                                required
                            />
                        </div>
                        <div className="form-row">
                            <label>Phone</label>
                            <input
                                type="text"
                                name="phone"
                                id='customer-number'
                                required
                            />
                        </div>
                        <h2>Cart Items</h2>
                        <div className="cart-items">
                            {cartFromSession.map(item => (
                                <div key={item.id} className="cart-item">
                                    <div className="cart-item-img"><img src={item.imagePath} alt="" /></div>
                                    <div className="cart-item-name">{item.name}</div>
                                    <div className="cart-item-quantity">Amount:{item.itemQuantity}</div>
                                    <div className="cart-item-price">
                                        ${parseFloat(item.price - (item.price * item.sale / 100)).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="total-price">Total: ${sessionStorage.getItem('totalCost')}</div>
                        <button type="submit" id='btn-pay'

                        >Submit Payment</button>
                        <ToastContainer
                            position="top-center"
                            autoClose={1000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                        />
                        <br />
                        <a href="/products">
                            <Button variant="primary">Continue Shopping</Button>
                        </a>
                    </form>
            }
        </div>

    )
}

export default Payment