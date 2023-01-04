import React from 'react';

const aboutImg = require('../static/img/aboutus.jpg')



function About() {
    return (
        <div class="w3-row w3-padding-64" id="about">
            <div class="w3-col m6 w3-padding-large w3-hide-small">
                <img src={aboutImg} class="w3-round w3-image w3-opacity-min" alt="Table Setting" width="600" height="750" />
            </div>

            <div class="w3-col m6 w3-padding-large">
                <h1 class="w3-center">About Us</h1><br />
                <h5 class="w3-center">Tradition since 1889</h5>
                <p class="w3-large">The Catering was founded in blabla by Mr. Smith in lorem ipsum dolor sit amet, consectetur adipiscing elit consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute iruredolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.We only use <span class="w3-tag w3-light-grey">seasonal</span> ingredients.</p>
                <p class="w3-large w3-text-grey w3-hide-medium">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod temporincididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
        </div>

    )
}

export default About;