import React, { useState } from 'react';
import '../style/order.css';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const OrderDetail = ({ order }) => {

    const handleCancel = () => {
        sessionStorage.setItem('isCancelled', true)
        // axios.get('http://localhost:3000/server/cancel_order.php')
        window.parent.location = window.parent.location.href;
    }

    return (
        <div className="order-card">
            <div className="header">
                <h2 className="order-header">Your Order</h2>
            </div>
            <div className="content">
                <p className="order-info">
                    <strong>Customer Name: {order.customer_name}</strong>
                </p>
                <p className="order-info">
                    <strong>Delivery to: {order.customer_address}</strong>
                </p>
                <p className="order-info">
                    <strong>Total Cost: ${order.total_cost}</strong>
                </p>
                <p className="order-info">
                    <strong>Order Date: {order.order_date}</strong>
                </p>
                <p className="order-info">
                    <strong>Estimated delivery date: {order.deli_date}</strong>
                </p>
                <p className="order-info">
                    <strong>Delivery service: SPX </strong>
                </p>
                <br /><br />
                <Button variant="danger" className='btn-cancel-order'
                    onClick={() => handleCancel()}
                >
                    Cancel Order</Button>
            </div>

        </div>
    );
};

export default OrderDetail;
