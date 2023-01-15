import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { FaSearch, FaTrash } from 'react-icons/fa';
import { Table, Button, Form } from "react-bootstrap";
import '../style/manage.css'

function Manage() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [products, setProducts] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false)

    const [orders, setOrders] = useState([
        { id: 1, product: "Product 1", customer: "John Doe", date: "01/01/2021" },
        { id: 2, product: "Product 2", customer: "Jane Doe", date: "01/02/2021" },
    ]);

    const [formData, setFormData] = useState({
        id: "",
        name: "",
        price: "",
    });
    useEffect(() => {
        fetch("http://localhost:3000/server/get_all_prod.php")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setProducts(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                    console.error('Error calling API')
                }
            )
    }, [])
    console.log(products)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setProducts([...products, formData]);
    };

    const handleDelete = (id) => {
        setProducts(products.filter((product) => product.id !== id));
    };

    const handleUpdate = (id) => {
        const productToUpdate = products.find((product) => product.id === id);
        setFormData(productToUpdate);
    };

    return (
        <div className="manage-page">
            <h1>Products Management</h1>
            <div className="form-container">
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>ID</Form.Label>
                        <Form.Control
                            type="text"
                            name="id"
                            value={formData.id}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Brand</Form.Label>
                        <Form.Control
                            type="text"
                            name="branch"
                            value={formData.brandID}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            type="text"
                            name="category"
                            value={formData.categoryID}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Size</Form.Label>
                        <Form.Control
                            type="text"
                            name="size"
                            value={formData.size}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Sale</Form.Label>
                        <Form.Control
                            type="text"
                            name="sale"
                            value={formData.sale}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="text"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                            type="text"
                            name="amount"
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Image Path</Form.Label>
                        <Form.Control
                            type="text"
                            name="imagePath"
                            value={formData.imagePath}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    {
                        isUpdate ?
                            <Button variant="primary" type="submit" className='btn-add-product'>
                                Update
                            </Button>
                            :
                            <Button variant="primary" type="submit" className='btn-add-product'>
                                Add Product
                            </Button>
                    }
                </Form>
            </div>
            <div className="table-container">
                <h2>Products</h2>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Brand</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Amount</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.shoeID}>
                                <td>{product.shoeID}</td>
                                <td>{product.name}</td>
                                <td>{product.brandID}</td>
                                <td>{product.categoryID}</td>
                                <td>{product.price}</td>
                                <td>1</td>
                                <td>
                                    <Button variant="danger" onClick={() => handleDelete(product.id)}>
                                        <FaTrash></FaTrash>
                                    </Button>
                                    <Button variant="warning" onClick={() => {
                                        handleUpdate(product.id)
                                        setIsUpdate(true)
                                    }}>Update</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <div className="table-container">
                <h2>Orders</h2>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Product</th>
                            <th>Customer</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.product}</td>
                                <td>{order.customer}</td>
                                <td>{order.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default Manage