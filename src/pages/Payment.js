import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../style/payment.css'
import Popup from 'reactjs-popup';
import { FaEye, FaPlusCircle } from 'react-icons/fa';
import OrderDetail from '../components/OrderDetail';
const checkmarkImg = require('../static/img/green-checkmark-icon.png')

function Payment() {
    const cartFromSession = JSON.parse(sessionStorage.getItem('cartItems'))
    const [isPaid, setIsPaid] = useState(1)
    const [totalCost, setTotalCost] = useState(sessionStorage.getItem('totalCost'))
    const [getVoucher, setGetVoucher] = useState('')
    const [disable, setDisable] = useState(false)
    const [isCOD, setIsCOD] = useState(false)
    const [orderToShow, setOrderToShow] = useState({})

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

    const notifyApplyVoucher = () => {
        toast.success('You have applied a voucher -20$ !', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    const voucher = "HPNY2023"

    const voucherApply = () => {
        if (getVoucher === voucher) {
            setTotalCost(totalCost - 20)
            notifyApplyVoucher()
            setDisable(true)
        }
        else {
            alert('Voucher not found!')
        }
    }

    const handleCheckBox = (e) => {
        if (e.target.checked) {
            setIsCOD(true)
        }
        else {
            setIsCOD(false)
        }
    }

    console.log(orderToShow)

    const postOrder = () => {
        var cus_name = document.getElementById('customer-name').value
        var cus_number = document.getElementById('customer-number').value
        var cus_address = document.getElementById('customer-address').value
        var cus_email = document.getElementById('customer-email').value
        let orderInfo = new FormData()
        let today = new Date().toISOString().slice(0, 10)
        let date = new Date()
        date.setDate(date.getDate() + 5)
        const or_detail = []
        const or_to_show = {
            customer_name: cus_name,
            customer_address: cus_address,
            total_cost: totalCost,
            order_date: today,
            deli_date: date.toISOString().slice(0, 10)
        }
        setOrderToShow(or_to_show)

        //add to order to show after pay

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
        orderInfo.append('money', totalCost)

        if (isCOD) {
            orderInfo.append('pay_method', 0)
        }
        else {
            orderInfo.append('pay_method', 1)
        }

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
                isPaid ?
                    <div style={{ textAlign: 'center' }}>
                        {/* <p><img src={checkmarkImg} alt="" style={{ width: '10%', height: '50%' }} /></p> */}
                        {
                            sessionStorage.getItem('isCancelled') === 'true' ?
                                <div>
                                    <div className="cross-container">
                                        <div className="cross-icon">
                                            <span className="cross-line cross-line-1"></span>
                                            <span className="cross-line cross-line-2"></span>
                                        </div>
                                        <div className="cross-message">Order cancelled.</div>
                                    </div>
                                    <br />
                                    <a href="/products">
                                        <Button variant="primary">Continue Shopping</Button>
                                    </a>
                                </div>

                                :
                                <div>
                                    <div className="check-container">
                                        <div className="check-icon">
                                            <span className="icon-circle"></span>
                                            <span className="icon-check"></span>
                                        </div>
                                        <div className="check-message">Order placed successfully!</div>
                                    </div>
                                    <a href="/products">
                                        <Button variant="primary">Continue Shopping</Button>
                                    </a>
                                    <br /><br />
                                    <Popup contentStyle={{ width: 'auto', height: 'auto' }}
                                        trigger={<Button variant="light" title='View your order'>
                                            View <FaEye></FaEye>
                                        </Button>}
                                        position="center-bottom"
                                    >
                                        <div>
                                            <OrderDetail order={orderToShow} />
                                        </div>
                                    </Popup>
                                </div>
                        }
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
                                placeholder='Name'
                                required
                            />
                        </div>
                        <div className="form-row">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                id='customer-email'
                                placeholder='Email'
                                required
                            />
                        </div>
                        <div className="form-row">
                            <label>Address</label>
                            <input
                                type="text"
                                name="address"
                                id='customer-address'
                                placeholder='Address'
                                required
                            />
                        </div>
                        <div className="form-row">
                            <label>Phone</label>
                            <input
                                type="text"
                                name="phone"
                                id='customer-number'
                                placeholder='Phone'
                                required
                            />
                        </div>

                        {
                            !isCOD &&
                            <div>
                                <div className="form-row">
                                    <label>Card Number</label>
                                    <input
                                        type="text"
                                        name="card-number"
                                        id="card-number"
                                        placeholder='Card Number'
                                        required
                                    />
                                </div>
                                <div className="form-row">
                                    <label>Cardholder's Name:</label>
                                    <input
                                        type="text"
                                        name="card-holder-name"
                                        placeholder="Cardholder's Name"
                                        id="card-holder-name"
                                        required
                                    />
                                </div>
                                <div className="form-row">
                                    <label>Expiration</label>
                                    <input
                                        type="date"
                                        name="expiration"
                                        id='expiration'
                                        required
                                    />
                                </div>
                                <div className="form-row">
                                    <label>CVV</label>
                                    <input
                                        type="password"
                                        name="cvv"
                                        id='cvv'
                                        placeholder="&#9679;&#9679;&#9679;"
                                        required
                                    />
                                </div>
                            </div>
                        }
                        <div className="voucher">
                            <label>Voucher</label>
                            <input
                                type="text"
                                name="voucher"
                                id='voucher'
                                onChange={(e) => setGetVoucher(e.target.value)}
                                disabled={disable}
                                placeholder="Voucher"
                            />
                        </div>
                        <Button variant="outline-primary" className='btn-voucher'
                            disabled={disable}
                            onClick={() => voucherApply()}
                        >
                            Apply
                        </Button>
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

                        <div className='COD-checkbox'>
                            <input
                                type="checkbox"
                                name="payment-method"
                                id='payment-method'
                                onChange={(e) => handleCheckBox(e)}
                            />
                            <label htmlFor="">Cash on Delivery</label>
                        </div>

                        {/* cartItems display */}

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
                        <div className="total-price">Total: ${totalCost}</div>
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