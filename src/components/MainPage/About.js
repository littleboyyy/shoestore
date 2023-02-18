import React from 'react';
const aboutUsImg = require('../../static/img/about-us-page.jpg')


function About() {
    return (
        <div class="w3-row w3-padding-64" id="about">
            <div class="w3-col m6 w3-padding-large w3-hide-small">
                <img src={aboutUsImg} class="w3-round w3-image w3-opacity-min" alt="Table Setting" width="600" height="750" />
            </div>

            <div class="w3-col m6 w3-padding-large">
                <h1 class="w3-center">About Us</h1><br />
                <p class="w3-large w3-text-grey">At our shoe store, we believe that every step should be taken in comfort and style. With a passion for footwear, we offer a curated collection of the latest trends and timeless classics to suit every occasion. From sneakers to sandals, boots to loafers, we've got you covered.</p>
                <p class="w3-large w3-text-grey">Our team of shoe enthusiasts is dedicated to providing exceptional customer service and ensuring you find the perfect pair to fit your feet and your lifestyle. Whether you're looking for a new everyday shoe or a special occasion heel, we are here to help you find the perfect fit.</p>
                <p class="w3-large w3-text-grey">Join us on our journey to put your best foot forward. Shop our collection today and step into style with confidence.</p>
            </div>
        </div>

    )
}

export default About;