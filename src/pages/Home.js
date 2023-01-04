import React from 'react';
import Navb from "../components/Navb";
import 'w3-css/w3.css';
import About from '../components/About';
import Contact from '../components/Contact';
import Description from '../components/Description';


function Home() {

    return (
        <div>
            <Navb></Navb>

            <div className="desc" id='desc'>
                <Description></Description>
            </div>

            <div className="about" id='about'>
                <About></About>
            </div>

            <div className="contact" id='contact'>
                <Contact></Contact>
            </div>
        </div>
    )
}

export default Home;