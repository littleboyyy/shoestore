import React from 'react';

const descImg = require('../static/img/description.jpg')

function Description() {
    return (
        <div class="w3-row w3-padding-64" id="home">
            <div class="w3-col l6 w3-padding-large">
                <h1 class="w3-center">What we sell?</h1><br />
                <h4>Nike</h4>
                <p class="w3-text-grey">Nike shoes are lightweight and durable – Despite provides exceptional comfort, flexibility, of Nike shoes are very light.</p><br />
                <h4>Adidas</h4>
                <p class="w3-text-grey">The adidas brand offers apparel and footwear for every sport, every fashion, and every style, whether you are an athlete or fashionista.</p><br />
                <h4>MLB</h4>
                <p class="w3-text-grey">Major League Baseball (MLB) is a professional baseball organization and the oldest major professional sports league in the world.</p><br />
            </div>
            <div class="w3-col l6 w3-padding-large">
                <img src={descImg} class="w3-round w3-image w3-opacity-min" alt="Menu" />
            </div>
        </div>
    )
}

export default Description;