import React from 'react';
import Navb from "../components/MainPage/Navb";
import 'w3-css/w3.css';
import About from '../components/MainPage/About';
import Contact from '../components/MainPage/Contact';
import Description from '../components/MainPage/Description';
import Slideshow from '../components/MainPage/Slide';


function Home() {

    const slideImages = [
        {
            url:
                "http://file.hstatic.net/200000097517/collection/111_724ec1567d85471498d9b8c5d9475d8d.jpg",
            caption: "Slide 1"
        },
        {
            url:
                "https://cdn.sanity.io/images/c1chvb1i/production/0c6af1240c4909b28cce909534488cc560bf6df5-1200x628.png?rect=42,0,1116,628&w=1200&h=675",
            caption: "Slide 2"
        }
    ];

    const onChangeHandler = (to) => {
        console.log("next", to);
    };

    return (
        <div>
            <Navb></Navb>

            <div className='slide-show'>
                <Slideshow slideImages={slideImages} onChangeHandler={onChangeHandler} />
            </div>

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