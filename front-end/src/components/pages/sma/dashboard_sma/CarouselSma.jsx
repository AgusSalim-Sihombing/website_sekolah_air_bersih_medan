import Carousel from 'react-bootstrap/Carousel';
import Foto from "../../../../assets/image.png"
import Foto2 from "../../../../assets/image2.png"

const CarouselBerandaSma = () => {
    return (
        <Carousel style={{ top: "30px" }}>
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
                />

            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={Foto}
                    alt="Third slide"
                />

            </Carousel.Item>
        </Carousel>
    )
}

export default CarouselBerandaSma;