import React from 'react';
const aboutUsImg = require('../static/img/about-us-page.jpg')


function About() {
    return (
        <div class="w3-row w3-padding-64" id="about">
            <div class="w3-col m6 w3-padding-large w3-hide-small">
                <img src={aboutUsImg} class="w3-round w3-image w3-opacity-min" alt="Table Setting" width="600" height="750" />
            </div>

            <div class="w3-col m6 w3-padding-large">
                <h1 class="w3-center">About Us</h1><br />
                <h5 class="w3-center">We are Husters!</h5>
                <p class="w3-large">Our team is from hust university, we sell sports shoes of brands such as Nike, Adidas, MLB, etc.. Hope you have the best experience with our products.</p>

            </div>
        </div>

    )
}

export default About;