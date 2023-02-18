import React, { useState } from 'react';
import '../../style/order.css';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const OrderDetail = ({ order }) => {

    let spxCode = Math.floor(Math.random() * 900000000000) + 100000000000;

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
                <p className="order-info">
                    <strong>Code: SPXVN{spxCode} </strong>
                </p>
                <br /><br />
            </div>

        </div>
    );
};

export default OrderDetail;
