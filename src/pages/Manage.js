import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { FaSignOutAlt, FaTrash } from 'react-icons/fa';
import { Table, Button, Form } from "react-bootstrap";
import '../style/manage.css'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useNavigate } from 'react-router-dom';

function Manage() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [products, setProducts] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false)
    const [orders, setOrders] = useState([]);
    const [formData, setFormData] = useState({
        shoeID: ''
    });

    const navigator = useNavigate()

    useEffect(() => {
        fetch("http://localhost:3000/server/ad_view_order.php")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setOrders(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                    console.error('Error calling API')
                }
            )
    }, [])

    useEffect(() => {
        fetch("http://localhost:3000/server/ad_view_storage.php")
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


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    console.log(formData)

    const handleAdd = () => {
        let formAddProd = new FormData()
        let sizes = []
        let amounts = []
        let sizeCount = 0
        let amountCount = 0
        formAddProd.append('name', formData.name)
        formAddProd.append('brand', formData.brand)
        formAddProd.append('category', formData.category)
        formAddProd.append('price', formData.price)
        formAddProd.append('sale', formData.sale)
        formAddProd.append('color', formData.color)
        formAddProd.append('imagePath', formData.imagePath)

        sizes = formData.sizes.split(',')
        amounts = formData.amounts.split(',')

        formAddProd.append('sizes', JSON.stringify(sizes))
        formAddProd.append('amounts', JSON.stringify(amounts))

        axios.post('http://localhost:3000/server/ad_add_prod.php', formAddProd)
            .then((data) => console.log(data))
    }

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

    const updateAction = (id) => {
        let formUpdProd = new FormData()
        const productToUpdate = products.find((product) => product.shoeID === id);
        formUpdProd.append('shoeID', id)
        for (let keys in productToUpdate) {
            if (formData[keys] && productToUpdate[keys] !== formData[keys]) {
                // if (keys === 'sizes' || keys === 'amounts') {
                //     let splitKeys = []
                //     splitKeys = formData[keys].split(',')
                //     console.log(splitKeys)
                //     formUpdProd.append(keys, JSON.stringify(formData[keys]))
                // }
                formUpdProd.append(keys, formData[keys])
                console.log(formUpdProd.get(keys))
            }
        }

        axios.post('http://localhost:3000/server/ad_edit_prod.php', formUpdProd)
            .then((data) => console.log(data))
    }

    const handleLogout = () => {
        localStorage.setItem('isValidate', false)
        navigator('/admin')
    }

    // console.log(formData)

    return (
        <div className="manage-page">
            <Button variant="secondary" className='btn-logout' title='sign out'
                onClick={() => handleLogout()}
            >
                <FaSignOutAlt></FaSignOutAlt>
            </Button>
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
                            disabled={true}
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
                        <Form.Select aria-label="Default select example" className='brand-select'
                            onChange={handleChange}
                            value={formData.brand}
                            name="brand"
                        >
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
                        <Form.Select aria-label="Default select example" className='category-select'
                            onChange={handleChange}
                            value={formData.category}
                            name="category"
                        >
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
                            name="amounts"
                            value={formData.amounts}
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
                                    updateAction(formData.shoeID)
                                    window.parent.location = window.parent.location.href
                                }}
                            >
                                Update
                            </Button>
                            :
                            <Button variant="primary" type="submit" className='btn-add-product'
                                onClick={() => {
                                    handleAdd()
                                    window.parent.location = window.parent.location.href
                                }}
                            >
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
                                <td>{product.brand}</td>
                                <td>{product.category}</td>
                                <td>{product.price}</td>
                                <td>{product.total_amount}</td>
                                <td>
                                    <Button title='Delete this' variant="danger" onClick={() => handleDelete(product.shoeID)}>
                                        <FaTrash></FaTrash>
                                    </Button>
                                    <Button variant="warning" onClick={() => {
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
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Total Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.orderID}</td>
                                <td>{order.cus_inf.name}</td>
                                <td>{order.orderDate}</td>
                                <td>{order.totalMoney}</td>
                                <td style={{ width: '10%' }}>
                                    <Popup
                                        trigger={<Button variant="primary" >
                                            View Detail
                                        </Button>}
                                        position="left center"
                                    >
                                        <div>
                                            {
                                                order.detail.map(item =>
                                                    <div>
                                                        <p>Item:{item.shoe_name}</p>
                                                        <p>Size:{item.size}</p>
                                                        <p>Amount:{item.amount}</p>
                                                        <p style={{ textAlign: 'center' }}>---------</p>
                                                    </div>
                                                )
                                            }

                                        </div>
                                    </Popup>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default Manage