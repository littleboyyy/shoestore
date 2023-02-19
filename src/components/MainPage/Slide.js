import { Slide } from "react-slideshow-image";

import "react-slideshow-image/dist/styles.css";
import styles from "../../style/slide.module.css";

export default function Slider() {
    const slideImages = [
        "http://file.hstatic.net/200000097517/collection/111_724ec1567d85471498d9b8c5d9475d8d.jpg",
        "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2019%2F11%2Fsneakers-generator-app-info-tw.jpg?w=960&cbr=1&q=90&fit=max"
    ]

    return (
        <div className={styles.slidecontainer}>
            <Slide easing="ease">
                {slideImages.map((slide, index) => {
                    return (
                        <div className={styles.slide} key={slide}>
                            <div style={{ backgroundImage: `url(${slideImages[index]})` }}>
                            </div>
                        </div>
                    );
                })}
            </Slide>
        </div>
    );
}
