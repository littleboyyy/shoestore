import React from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';

function Manage() {
    return (
        <div>
            <div className="">
                <div className="row">
                    <div className="vertical-nav bg-white col-2" id="sidebar">
                        <div className="py-4 px-3 mb-4 bg-light text-center">
                            <img src="https://res.cloudinary.com/mhmd/image/upload/v1556074849/avatar-1_tcnd60.png" alt="..."
                                width="65" className="mr-3 rounded-circle img-thumbnail shadow-sm" />
                            <h4 className="m-0">Jason Doe</h4>
                            <p className="font-weight-light text-muted mb-0">Web developer</p>
                            <p className="btn btn-primary font-weight-light btn-sm" id="generate">Generate Data</p>
                        </div>

                        <p className="text-gray font-weight-bold text-uppercase px-3 small pb-3 mb-0 ml-1">Quản Lý</p>

                        <ul className="nav flex-column bg-white mb-0 ml-1">
                            <li className="nav-item" id="s_product">
                                <a href="/admin/product.html" className="nav-link text-dark font-italic bg-light">
                                    <i className="fa fa-th-large mr-1 text-primary fa-fw"></i>
                                    Product
                                </a>
                            </li>

                            <li className="nav-item" id="s_order">
                                <a href="/admin/order.html" className="nav-link text-dark font-italic bg-light">
                                    <i className="fa fa-cubes mr-1 text-primary fa-fw"></i>
                                    Order
                                </a>
                            </li>
                        </ul>
                    </div>


                    <div className="col-10">


                        <div className="product-manager" id="product-manager">
                            <div className="notification offset-9">
                                <div className="notification-content" id="notifi">
                                    <p id="notifi-content"></p>
                                </div>
                            </div>
                            <div className="text-center mt-2 mb-3">
                                <h4>Quản Lý Sản Phẩm</h4>
                            </div>
                            <div className="action mb-4">
                                <div className="frms container" id="form-id">
                                    <div className="form-row">
                                        <div className="form-group col-md-4">
                                            <label for="code">Code: </label>
                                            <input type="text" className="form-control" id="code" placeholder="Code" />
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label for="category">Category: </label>
                                            <select className="form-control" id="category">
                                                <option value="0">Giày Nam</option>
                                                <option value="1">Giày Nữ</option>
                                                <option value="2">Phụ Kiện</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label for="name">Name: </label>
                                            <input type="text" className="form-control" id="name" placeholder="Name" />
                                        </div>

                                        <div className="form-group col-md-4">
                                            <label for="brand">Brand: </label>
                                            <input type="text" className="form-control" id="brand" placeholder="Brand" />
                                        </div>

                                        <div className="form-group col-md-4">
                                            <label for="size">Size: </label>
                                            <input type="text" className="form-control" id="size" placeholder="Size" />
                                        </div>

                                        <div className="form-group col-md-4">
                                            <label for="sale">Sale: </label>
                                            <input type="text" className="form-control" id="sale" placeholder="Sale" />
                                        </div>

                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-4">
                                            <label for="price">Price: </label>
                                            <input type="text" className="form-control" id="price" placeholder="Price" />
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label for="amount">Amount: </label>
                                            <input type="number" className="form-control" id="amount" placeholder="Amount" />
                                        </div>

                                    </div>
                                    <div className="form-group col-md-3">
                                        <label for="image">Image: </label>
                                        <input type="text" className="form-control" id="image" placeholder="Link Image..." />
                                    </div>
                                    <div className="text-center" id="actbutton">
                                        <button type="button" className="btn btn-outline-info btn-sm" id="update"
                                            style={{ display: 'none' }}>Update</button>
                                        <button type="button" className="btn btn-outline-success btn-sm" id="add_new">Add product</button>
                                    </div>
                                </div>
                            </div>
                            <div className="tab container">

                                <div className="d-flex offset-8 col-md-4 mb-3">
                                    <input type="text" name="search" id="search" className="search"
                                        placeholder="Search....." />
                                    <FaSearch></FaSearch>
                                </div>
                                <table className="table table-bordered text-center">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th scope="col">Code</th>

                                            <th scope="col">Product</th>
                                            <th scope="col">Category</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Brand</th>
                                            <th scope="col">Amount</th>
                                            <th scope="col">#</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbody">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Manage