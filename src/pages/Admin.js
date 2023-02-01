import React from 'react';
import '../style/admin.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Admin() {
    const navigate = useNavigate()
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [show, setShow] = useState(true);
    const [items, setItems] = useState([]);

    const notifyLoginFail = () => {
        toast.error('Wrong Username or Password!', {
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

    const notifyLoginSuccess = () => {
        toast.success('Login Successfully!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    var userValidate = (username, password) => {
        const unameExist = items.find(x => x.uname === username)
        const passwdExist = items.find(y => y.passwd === password)

        if (unameExist && passwdExist) {
            localStorage.setItem('isValidate', true)
            notifyLoginSuccess()
        }
        else {
            // notifyLoginFail()
            alert('Wrong username or password!')
            localStorage.setItem('isValidate', false)
        }
    }

    useEffect(() => {
        fetch("http://localhost:3000/server/get_admin.php")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])


    return (

        <div className='admin-container'>
            <div className="imgcontainer">
                <img src="https://cdn-icons-png.flaticon.com/512/295/295128.png" alt="Avatar" class="avatar" />
            </div>
            <div className='container'>
                <label htmlFor="uname"><b>Username</b></label>
                <br />
                <input type="text" placeholder="Username" name='uname' id='uname' required />
                <br />
                <label htmlFor="psw"><b>Password</b></label>
                <br />
                <input type="password" placeholder="Password" name='psw' id='psw' required />
                <br /><br />


                <a href="/admin/manage" id='tag-to-manage' >
                    <button type="submit" id='btn-login' onClick={() => {
                        var username = document.getElementById('uname').value
                        var psw = document.getElementById('psw').value
                        userValidate(username, psw)
                    }}>Login</button>
                </a>

                <ToastContainer
                    position="top-center"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />

                <br /><br />
            </div>
        </div>
    )
}

export default Admin