import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

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
            .catch(() => console.error('loi post'))
        notifyPaid()
        // setTimeout(() => {
        //     navigator('/')
        // }, 2000)
        setIsPaid(1)
        // window.parent.location = window.parent.location.href
    }

    return (

        <div className="container">
            {console.log(isPaid)}
            {
                isPaid ?
                    <div>
                        <h1>Your order has been received!</h1>
                        <a href="/products">
                            <Button variant="primary" onClick={() => setIsPaid(0)}>Continue Shopping</Button>
                        </a>
                    </div>
                    :
                    <div className="row">
                        <div className="col-8">
                            <h4>Purchasing </h4>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col" colspan="2">Items</th>
                                        <th scope="col">Color</th>
                                        <th scope="col">Size</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Amount</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>

                                <thead>
                                    {
                                        cartFromSession.map(item =>
                                            <tr>
                                                <th scope="col" colspan="2" style={{ width: '40%' }}><img src={item.imagePath} style={{ width: '20%', height: '10%', }} /></th>
                                                <th scope="col" style={{ verticalAlign: 'middle' }}>{item.color}</th>
                                                <th scope="col" style={{ verticalAlign: 'middle' }}>{item.size}</th>
                                                <th scope="col" style={{ verticalAlign: 'middle' }}>${item.price}</th>
                                                <th scope="col" style={{ verticalAlign: 'middle' }}>{item.itemQuantity}</th>
                                                <th scope="col"></th>
                                            </tr>
                                        )

                                    }
                                </thead>

                                <tbody id="cart-table">

                                </tbody>

                                <tr>
                                    <td colspan="6">
                                        Total is : ${sessionStorage.getItem('totalCost')}
                                    </td>
                                    <td>

                                    </td>
                                </tr>
                            </table>
                            <div>
                                <a href="/products">
                                    <Button variant="primary">Continue Shopping</Button>
                                </a>
                            </div>

                        </div>
                        <div className="col-4">
                            <div className="pay-info" id="customer-form">
                                <h3>Delivery</h3>
                                <div className="form-group">
                                    <label for="customer-name">Name: </label>
                                    <input type="text" className="form-control" id="customer-name" placeholder="Name.." />
                                </div>
                                <div className="form-group">
                                    <label for="customer-number">Phone number: </label>
                                    <input type="text" className="form-control" id="customer-number" placeholder="Phone number.." />
                                </div>
                                <div className="form-group">
                                    <label for="customer-address">Address: </label>
                                    <input type="text" className="form-control" id="customer-address" placeholder="Address.." />
                                </div>
                                <div className="form-group">
                                    <label for="customer-email">Email: </label>
                                    <input type="email" className="form-control" id="customer-email" placeholder="Email.." />
                                </div>
                                <div className="form-group">
                                    <label for="customer-note">Note: </label>
                                    <textarea className="form-control" id="customer-note" rows="3"></textarea>
                                </div>
                                <br />
                                <Button variant="success"
                                    onClick={() => {
                                        postOrder()
                                        sessionStorage.clear()
                                    }

                                    }>
                                    Pay
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
                            </div>

                        </div>
                    </div>
            }

        </div>
    )
}

export default Payment