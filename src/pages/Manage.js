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
    const [isDisable, setIsDisable] = useState(false)

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
        let shoeID = new FormData()
        setProducts(products.filter((product) => product.shoeID !== id));
        shoeID.append('shoeID', id)
        axios.post('http://localhost:3000/server/delete_prod.php', shoeID)
    };

    const handleUpdate = (id) => {
        const productToUpdate = products.find((product) => product.shoeID === id);
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
                            name="shoeID"
                            value={formData.shoeID}
                            onChange={handleChange}
                            disabled={isDisable}
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
                        <Form.Select aria-label="Default select example" className='brand-select'>
                            <option value="DUCA DI MORRONE">DUCA DI MORRONE</option>
                            <option value="ADIDAS">ADIDAS</option>
                            <option value="KATE SPADE">KATE SPADE</option>
                            <option value="KENZO">KENZO</option>
                            <option value="WHOAU">WHOAU</option>
                            <option value="SKECHERS">SKECHERS</option>
                            <option value="MLB KOREA">MLB KOREA</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className='category-label'>Category</Form.Label>
                        <Form.Select aria-label="Default select example" className='category-select'>
                            <option value="men">men</option>
                            <option value="women">women</option>
                            <option value="unisex">unisex</option>
                            <option value="kid">kid</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Sizes</Form.Label>
                        <Form.Control
                            type="text"
                            name="sizes"
                            value={formData.sizes}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Color</Form.Label>
                        <Form.Control
                            type="text"
                            name="color"
                            value={formData.color}
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
                            <Button variant="primary" type="submit" className='btn-add-product'
                                onClick={() => {
                                    setIsUpdate(false)
                                    setIsDisable(false)
                                }}
                            >
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
                                    <Button title='Delete this' variant="danger" onClick={() => handleDelete(product.shoeID)}>
                                        <FaTrash></FaTrash>
                                    </Button>
                                    <Button variant="warning" onClick={() => {
                                        setIsDisable(true)
                                        setIsUpdate(true)
                                        handleUpdate(product.shoeID)
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