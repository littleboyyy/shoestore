import React from 'react';
import axios from 'axios';

function Payment() {
    const cartFromSession = JSON.parse(sessionStorage.getItem('cartItems'))
    return (
        <div className="container">
            <div className="row">
                <div className="col-8">
                    <h4>Thông Tin Sản Phẩm</h4>
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
                        {console.log(cartFromSession)}
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
                            <button type="button" className="btn btn-primary btn-sm">Continue Shopping</button>
                        </a>
                    </div>

                </div>
                <div className="col-4">
                    <div className="pay-info" id="customer-form">
                        <h3>Thông tin giao hàng</h3>
                        <div className="form-group">
                            <label for="customer-name">Tên: </label>
                            <input type="text" className="form-control" id="customer-name" placeholder="Tên" />
                        </div>
                        <div className="form-group">
                            <label for="customer-number">Số Điện Thoại: </label>
                            <input type="text" className="form-control" id="customer-number" placeholder="Số Điện Thoại" />
                        </div>
                        <div className="form-group">
                            <label for="customer-address">Địa Chỉ: </label>
                            <input type="text" className="form-control" id="customer-address" placeholder="Địa Chỉ" />
                        </div>
                        <div className="form-group">
                            <label for="customer-email">Email: </label>
                            <input type="email" className="form-control" id="customer-email" placeholder="Email" />
                        </div>
                        <div className="form-group">
                            <label for="customer-note">Ghi chú: </label>
                            <textarea className="form-control" id="customer-note" rows="3"></textarea>
                        </div>
                        <br />
                        <button type="submit" className="btn btn-primary btn-sm btn-block" id="order">Order</button>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Payment