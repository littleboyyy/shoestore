import React from 'react';
import axios from 'axios';

function Manage() {

    const handleSubmit = (e) => {

        e.preventDefault()
        var username = document.getElementById('uname').value
        var password = document.getElementById('passwd').value
        var name = document.getElementById('name').value
        var phone = document.getElementById('phone').value
        var email = document.getElementById('email').value

        let data = new FormData()
        data.append('uname', username)
        data.append('passwd', password)
        data.append('name', name)
        data.append('phone', phone)
        data.append('email', email)

        axios.post('http://localhost:3000/ReviewLab&Exers/AdminApi.php', data)
            .then(() => {
                console.log('Sent to database!')
                console.log(data)
            })
            .catch(error => (error) => console.log(error))

    }

    return (
        <div>
            <label>
                User Name:
                <input type="text" name="uname" id='uname' />
            </label>
            <label >
                Pass
                <input type="text" name="passwd" id='passwd' />
            </label>
            <label>
                Name:
                <input type="text" name="name" id='name' />
            </label>
            <label>
                SDT
                <input type="text" name="phone" id='phone' />
            </label>
            <label>
                mail
                <input type="text" name="email" id='email' />
            </label>
            <input type="button" value="Submit" onClick={handleSubmit} />
        </div>
    )
}

export default Manage