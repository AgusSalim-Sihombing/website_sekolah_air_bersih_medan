import Carousel from 'react-bootstrap/Carousel';
import Foto from "../../../../assets/image.png";
import Foto2 from "../../../../assets/image2.png";

import "./CarouselBeranda.css";

const CarouselBerandaSma = () => {
    return (
        <Carousel className="carousel-3d" slide="true">
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={Foto}
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={Foto2}
                    alt="Second slide"
                    loading="lazy"
                />
            </Carousel.Item>
        </Carousel>
    );
};

export default CarouselBerandaSma;
