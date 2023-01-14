import React from 'react';

export default function Order() {
    return (
        <div class="">
            <div class="row">
                <div class="vertical-nav bg-white col-2" id="sidebar">
                    <div class="py-4 px-3 mb-4 bg-light text-center">
                        <img src="https://res.cloudinary.com/mhmd/image/upload/v1556074849/avatar-1_tcnd60.png" alt="..."
                            width="65" class="mr-3 rounded-circle img-thumbnail shadow-sm" />
                        <h4 class="m-0">Hoang</h4>
                        <p class="font-weight-light text-muted mb-0">Web developer</p>
                        <p class="btn btn-primary font-weight-light btn-sm" id="generate">Generate Data</p>
                    </div>

                    <p class="text-gray font-weight-bold text-uppercase px-3 small pb-3 mb-0 ml-1">Manage</p>

                    <ul class="nav flex-column bg-white mb-0 ml-1">
                        <li class="nav-item" id="s_product">
                            <a href="/admin/manage" class="nav-link text-dark font-italic bg-light">
                                <i class="fa fa-th-large mr-1 text-primary fa-fw"></i>
                                Product
                            </a>
                        </li>

                        <li class="nav-item" id="s_order">
                            <a href="/admin/order" class="nav-link text-dark font-italic bg-light">
                                <i class="fa fa-cubes mr-1 text-primary fa-fw"></i>
                                Order
                            </a>
                        </li>
                    </ul>
                </div>


                <div class="col-10">

                    <div class="order-manager" id="order-manager">
                        <div class="text-center mt-2 mb-3">

                        </div>
                        <div class="order-tab container">
                            <table class="table text-center">
                                <thead class="thead-dark">
                                    <tr>
                                        <th scope="col">OrderID</th>
                                        <th scope="col">UserID</th>
                                        <th scope="col">Ngày Tạo</th>
                                        <th scope="col">PT Thanh Toán</th>
                                        <th scope="col">Trạng Thái</th>
                                        <th scope="col">Chi Tiết</th>
                                    </tr>
                                </thead>
                                <tbody id="order_tbody">

                                    <tr>
                                        <th>orderid</th>
                                        <th>uderid</th>
                                        <td>date</td>
                                        <td>thanh toan</td>
                                        <td>trang thai</td>
                                        <td>chi tiet</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}