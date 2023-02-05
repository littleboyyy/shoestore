import React from 'react';
import '../style/order.css';

const OrderDetail = ({ order }) => {
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
            </div>
        </div>
    );
};

export default OrderDetail;
