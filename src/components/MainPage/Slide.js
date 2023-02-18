import { Slide } from "react-slideshow-image";

import "react-slideshow-image/dist/styles.css";
import styles from "../../style/slide.module.css";

export default function Slider() {
    const slideImages = [
        "http://file.hstatic.net/200000097517/collection/111_724ec1567d85471498d9b8c5d9475d8d.jpg",
        "https://images.complex.com/complex/images/c_fill,f_auto,g_center,w_1200/fl_lossy,pg_1/gbwm0p98mcxcxfhexejj/travis-scott",
        "https://i.insider.com/5d3b697b100a24103f2e3762?width=1136&format=jpeg",
        "https://cdn.pixabay.com/photo/2015/04/23/21/59/tree-736875_960_720.jpg",
        "https://cdn.pixabay.com/photo/2014/05/03/00/56/summerfield-336672_960_720.jpg"
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
